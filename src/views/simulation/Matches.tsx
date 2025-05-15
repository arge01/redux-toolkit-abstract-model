/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/card";
import Button from "@/components/forms/Buttons";
import { useService } from "@/hooks/useService";
import { fetchMiddleware } from "@/middleware/fetchMiddleware";
import {
  type MODEL as GroupModel,
  services as groupsService,
} from "@/services/groups";
import { ErrorType } from "@/services/imp";
import {
  type MODEL as MatchModel,
  type REQUEST as MatchRequest,
  services as matchService,
} from "@/services/matches";
import { MODEL, REQUEST, services } from "@/services/soccer";
import {
  type MODEL as Tournamed,
  services as tournamedServices,
} from "@/services/tournamed";
import { createGroupMatchesForWeek } from "@/utils/createGroupMatches";
import { getTotalPoints } from "@/utils/getTotalPoints ";
import Match from "./Match";
import ShowAllMatches from "./ShowAllMatches";

function Matches() {
  const navigate = useNavigate();

  const [totalMatch, setTotalMatch] = useState<MatchModel[] | undefined>(
    undefined
  );
  const totalMatchResponse = async (tournamed: Tournamed) => {
    try {
      const response = await fetchMiddleware("/matches/criteria", "POST", [
        { tournamed: tournamed },
      ]);

      if (response.data) {
        setTotalMatch(response.data);
      }
    } catch (error: ErrorType) {
      toast.error(error.message);
    }
  };

  const [page, setPage] = useState<number>(0);

  const [matches, matchesDispatch] = useService<MatchModel, MatchRequest>(
    matchService
  );
  const [loading, setLoading] = useState<boolean>(false);

  const nextMatches = async () => {
    setLoading(true);

    const week = createGroupMatchesForWeek(
      groups.entities || [],
      soccer.entities || [],
      tournamed.entity || ({} as Tournamed),
      page + 1
    );

    const groupMatch = week.map(({ week, ...rest }) => rest);

    try {
      const response = await fetchMiddleware(
        "/matches/all-create",
        "POST",
        groupMatch
      );

      if (response.data) {
        setPage(page + 1);
        setLoading(false);

        if (tournamed.entity) {
          totalMatchResponse(tournamed.entity);
          matchesDispatch.criteria([{ tournamed: tournamed.entity }], {
            page: page + 1,
            size: 16,
          });
        }
      }
    } catch (error: ErrorType) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const [groups, groupsDispatch] = useService<GroupModel>(groupsService);
  useEffect(() => {
    groupsDispatch.all();
  }, [groupsDispatch]);
  useEffect(() => {
    if (!groups.findAllSuccess) {
      groupsDispatch.all();
    }
  }, [groups.findAllSuccess]);

  const key = useParams<{ key: string }>()?.key;

  const [soccer, dispatch] = useService<MODEL, REQUEST>(services);
  const [tournamed, tournamedDispatch] =
    useService<Tournamed>(tournamedServices);

  useEffect(() => {
    if (!tournamed.success) {
      tournamedDispatch.getCriteria({ key: key || "" });
    }
  }, [key, tournamed.success]);

  useEffect(() => {
    if (tournamed.entity?.id) {
      matchesDispatch.criteria([{ tournamed: tournamed.entity }], {
        page: 1,
        size: 16,
      });
    }
  }, [tournamed]);

  useEffect(() => {
    if (!soccer.findAllSuccess) {
      if (tournamed.entity?.id) {
        dispatch.criteria([{ tournamed: tournamed.entity }]);
      }
    }
  }, [tournamed, soccer.findAllSuccess]);

  useEffect(() => {
    if (tournamed.entity) {
      totalMatchResponse(tournamed.entity);
    }
  }, [tournamed, matches.findAllSuccess]);

  useEffect(() => {
    if (totalMatch?.length || 0 > 16) {
      setPage(Math.ceil(Number(totalMatch?.length) / 16));
    }
  }, [totalMatch]);

  const [show, setShow] = useState<boolean>(false);
  const [findMatches, setFindMatches] = useState<MatchModel[]>(
    [] as MatchModel[]
  );
  const [findMatchesSoccer, setFindMatchesSoccer] = useState<MODEL>(
    {} as MODEL
  );
  const selectFindMatches = (soccer: MODEL, matchesAll: MatchModel[]) => {
    const matchesField =
      matchesAll.filter((f) => Number(f.field.id) === Number(soccer.id)) ||
      ([] as MatchModel[]);

    const matchesOutfield =
      matchesAll.filter((f) => Number(f.outfield.id) === Number(soccer.id)) ||
      ([] as MatchModel[]);

    setFindMatches([...matchesField, ...matchesOutfield]);
    setFindMatchesSoccer(soccer);
    setShow(true);
  };

  return (
    <Card>
      {tournamed.entity?.id && (
        <>
          <Card.Item className="flex justify-between w-full">
            <Button
              onClick={() => navigate(`/play/groups/${key}`)}
              variant="danger"
              className="flex justify-between items-center"
            >
              <GrPrevious className="pr-[7.5px]" size={25} /> Back
            </Button>
            <span className="items-center text-[10pt] justify-center font-bold flex text-center p-5">
              {tournamed.entity.name}
            </span>
            <div className="flex gap-[5px]">
              <>
                {page <= 5 ? (
                  <Button
                    onClick={() => (page <= 5 ? nextMatches() : undefined)}
                    loading={loading}
                    variant="dark"
                    className="flex justify-between items-center"
                  >
                    Play Weeks {page <= 5 ? page + 1 : 6}{" "}
                    <GrNext className="pl-[7.5px]" size={25} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/play/groups/${key}/finals`)}
                    loading={loading}
                    variant="dark"
                    className="flex justify-between items-center text-right"
                  >
                    Next Simulation The Finals
                    <GrNext className="pl-[7.5px]" size={25} />
                  </Button>
                )}
              </>
            </div>
          </Card.Item>

          {page <= 5 ? (
            <>
              {matches.entities?.length ? (
                <Match matches={matches.entities} />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {totalMatch && (
            <Card.Item className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
                {(groups.entities || []).map((v, k) => (
                  <div
                    key={k}
                    className="border rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="bg-gray-100 p-3 font-bold text-center border-b">
                      {v.name.toUpperCase()} GROUP
                    </div>
                    <div
                      className={`divide-y divide ${page <= 5 ? "" : "final-group"}`}
                    >
                      {soccer.entities
                        ?.filter((f) => f.groups.id === v.id)
                        .sort(
                          (a, b) =>
                            getTotalPoints(b, totalMatch) -
                            getTotalPoints(a, totalMatch)
                        )
                        .map((s, sk) => (
                          <div
                            key={sk}
                            className="divide-group p-3 flex items-center justify-between"
                          >
                            <a
                              href={`#group=${encodeURIComponent(s.groups.id)}&team=${encodeURIComponent(s.id)}`}
                              className="flex items-center space-x-3"
                            >
                              <span className="text-gray-500">{s.country}</span>
                              <span
                                onClick={() => {
                                  selectFindMatches(s, totalMatch);
                                  return false;
                                }}
                                className="cursor-pointer hover:no-underline font-medium text-[blue] underline"
                              >
                                {s.name}
                              </span>
                            </a>
                            <span className="text-[10pt] font-bold text-gray-500">
                              {getTotalPoints(s, totalMatch)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Item>
          )}
        </>
      )}

      {show && (
        <ShowAllMatches
          soccer={findMatchesSoccer}
          matches={findMatches}
          setShow={setShow}
        />
      )}
    </Card>
  );
}

export default Matches;

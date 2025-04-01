/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { createGroupMatches } from "@/utils/createGroupMatches";
import { getTotalPoints } from "@/utils/getTotalPoints ";

function Matches() {
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
      toast.error("Score could not be calculated");
    }
  };

  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();

  const [matches, matchesDispatch] = useService<MatchModel, MatchRequest>(
    matchService
  );
  const [loading, setLoading] = useState<boolean>(false);

  const nextMatches = async () => {
    setLoading(true);

    const groupMatch = createGroupMatches(
      groups.entities || [],
      soccer.entities || [],
      tournamed.entity || ({} as Tournamed)
    );

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
            page,
            size: 48,
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
        size: 48,
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
    if (totalMatch?.length || 0 > 48) {
      setPage(Number(totalMatch?.length) / 48);
    }
  }, [totalMatch]);

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
            <span className="items-center text-[10pt] justify-center font-bold flex">
              {tournamed.entity.name}
            </span>
            <Button
              onClick={() => (page <= 2 ? nextMatches() : undefined)}
              loading={loading}
              variant="dark"
              className="flex justify-between items-center"
            >
              Play Weeks {page + 1} <GrNext className="pl-[7.5px]" size={25} />
            </Button>
          </Card.Item>

          <>
            {page <= 2 ? (
              <>
                {matches.entities?.length ? (
                  <Card.Item className="w-full">
                    <div className="space-y-4 p-4">
                      <h2 className="text-xl font-bold mb-4">Match Results</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {matches.entities?.map((match: any) => (
                          <div
                            key={match.id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-right flex-1">
                                <p className="font-medium">
                                  {match.field.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {match.field.country}
                                </p>
                              </div>

                              <div className="mx-4 flex flex-col items-center">
                                <div className="text-2xl font-bold">
                                  {match.goal_field} - {match.goal_outfield}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {new Date(
                                    match.created_at || new Date()
                                  ).toLocaleDateString()}
                                </div>
                              </div>

                              <div className="text-left flex-1">
                                <p className="font-medium">
                                  {match.outfield.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {match.outfield.country}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 pt-2 border-t text-center text-sm text-gray-500">
                              Group {match.groups?.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card.Item>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </>

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
                      className={`divide-y divide ${page <= 2 ? "" : "final-group"}`}
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
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-500">{s.country}</span>
                              <span className="font-medium">{s.name}</span>
                            </div>
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
    </Card>
  );
}

export default Matches;

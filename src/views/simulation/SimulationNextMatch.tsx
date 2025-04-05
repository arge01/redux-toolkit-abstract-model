import { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";
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
  MODEL as MatchModel,
  MATCHES,
  FINAL,
  QUA,
  QUARTER,
  SEMI,
} from "@/services/matches";
import {
  services as soccerService,
  MODEL as SoccerModel,
} from "@/services/soccer";
import { services, MODEL as TournamedModel } from "@/services/tournamed";
import * as createFinalMatches from "@/utils/createFinalMatches";
import Match from "./Match";
import SimulationNextMatchButton from "./SimulationNextMatchButton";

type name = "qua" | "quarter" | "semi" | "final" | "champion";

export type Data = {
  name: name;
  data: {
    qua: QUA[];
    quarter: QUARTER[];
    semi: SEMI[];
    final: FINAL[];
    champion: SoccerModel[];
  };
};

function SimulationNextMatch() {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [name, setName] = useState<Data["name"]>("qua");
  const [data, setData] = useState<Data["data"]>();

  const key = useParams<{ key: string }>()?.key;
  const [tournamed, tournamedDispatch] = useService<TournamedModel>(services);
  useEffect(() => {
    if (!tournamed.success) {
      tournamedDispatch.getCriteria({ key: key || "" });
    }
  }, [key, tournamed.success]);
  useEffect(() => {
    if (tournamed.entity?.id) {
      activeChanged(tournamed.entity || ({} as TournamedModel));
    }
  }, [tournamed]);

  const [soccer, dispatch] = useService<SoccerModel>(soccerService);
  useEffect(() => {
    if (!soccer.findAllSuccess) {
      if (tournamed.entity?.id) {
        dispatch.criteria([{ tournamed: tournamed.entity }]);
      }
    }
  }, [tournamed, soccer.findAllSuccess]);

  const [groups, groupsDispatch] = useService<GroupModel>(groupsService);
  useEffect(() => {
    if (!groups.findAllSuccess) {
      groupsDispatch.all();
    }
  }, [groups.findAllSuccess]);

  const activeChanged = async (tournamed: TournamedModel) => {
    setLoading(true);

    fetchMiddleware(`/the-finals/get/${tournamed.id}`, "GET")
      .then((response) => response.data)
      .then((data: Data) => {
        setName(data.name);
        setData(data.data);
        setLoading(false);
      })
      .catch((error: ErrorType) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  const saveQuaMatches = async (tournamed: TournamedModel, qua: MATCHES[]) => {
    setLoading(true);

    if (qua.length === 8) {
      fetchMiddleware(`/the-finals/create/${tournamed.id}/qua`, "POST", qua)
        .then((response) => response.data)
        .then((data: Data) => {
          setName(data.name);
          setData(data.data);
          setLoading(false);
        })
        .catch((error: ErrorType) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.warning("Please try again");
      setLoading(false);
    }
  };

  const saveQuarterMatches = async (
    tournamed: TournamedModel,
    match: MATCHES[]
  ) => {
    setLoading(true);

    if (match.length === 4) {
      fetchMiddleware(
        `/the-finals/create/${tournamed.id}/quarter`,
        "POST",
        match
      )
        .then((response) => response.data)
        .then((data: Data) => {
          setName(data.name);
          setData(data.data);
          setLoading(false);
        })
        .catch((error: ErrorType) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.warning("Please try again");
      setLoading(false);
    }
  };

  const saveSemiMatches = async (
    tournamed: TournamedModel,
    match: MATCHES[]
  ) => {
    setLoading(true);

    if (match.length === 2) {
      fetchMiddleware(`/the-finals/create/${tournamed.id}/semi`, "POST", match)
        .then((response) => response.data)
        .then((data: Data) => {
          setName(data.name);
          setData(data.data);
          setLoading(false);
        })
        .catch((error: ErrorType) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.warning("Please try again");
      setLoading(false);
    }
  };

  const saveFinalMatches = async (
    tournamed: TournamedModel,
    match: MATCHES[]
  ) => {
    setLoading(true);

    if (match.length === 1) {
      fetchMiddleware(`/the-finals/create/${tournamed.id}/final`, "POST", match)
        .then((response) => response.data)
        .then((data: Data) => {
          setName(data.name);
          setData(data.data);
          setLoading(false);
        })
        .catch((error: ErrorType) => toast.error(error.message))
        .finally(() => setLoading(false));
    } else {
      toast.warning("Please try again");
      setLoading(false);
    }
  };

  const totalMatchResponse = async (tournamed: TournamedModel) => {
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
  const [totalMatch, setTotalMatch] = useState<MatchModel[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (tournamed.entity?.id) {
      totalMatchResponse(tournamed.entity);
    }
  }, [tournamed.entity?.id]);

  const nextSimulate = async () => {
    if (totalMatch) {
      const t = tournamed.entity || ({} as TournamedModel);

      if (name === "qua") {
        const qua = createFinalMatches.createQualificationMatches(
          groups.entities || [],
          soccer.entities || [],
          tournamed.entity || ({} as TournamedModel),
          totalMatch || []
        );

        saveQuaMatches(t, qua);
      }

      if (name === "quarter") {
        const winners = createFinalMatches.getWinnersFromMatches(
          data?.qua || []
        );
        const quarter = createFinalMatches.createQuarterFinalMatches(
          winners,
          t
        );

        saveQuarterMatches(t, quarter);
      }

      if (name === "semi") {
        const winners = createFinalMatches.getWinnersFromMatches(
          data?.quarter || []
        );
        const semi = createFinalMatches.createSemiFinalMatches(winners, t);

        saveSemiMatches(t, semi);
      }

      if (name === "final") {
        const winners = createFinalMatches.getWinnersFromMatches(
          data?.semi || []
        );
        const final = createFinalMatches.createFinalMatch(winners, t);

        saveFinalMatches(t, final);
      }
    }
  };
  return (
    <Card>
      {Number(totalMatch?.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <Button
            onClick={() => navigate(`/play/groups/${key}/matches`)}
            variant="danger"
            className="flex justify-between items-center"
          >
            <GrPrevious className="pr-[7.5px]" size={25} /> Back
          </Button>
          <span className="items-center text-[10pt] justify-center font-bold flex">
            {tournamed.entity?.name}
          </span>
          <SimulationNextMatchButton
            loading={loading}
            onClick={() => nextSimulate()}
            name={name}
          />
        </Card.Item>
      )}

      {Number(data?.champion.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <div className="w-full flex flex-wrap">
            <h4 className="w-full text-[1.2rem] font-bold uppercase">
              Champions <span className="text-[8pt]">[3, 1, 2]</span>
            </h4>
            <div className="w-full flex w-full flex-wrap items-end">
              <div className="w-full flex-col lg:w-1/3 md:w-full flex items-cenrer justify-center flex-wrap">
                <span className="w-full font-bold text-[#eebb1c] flex w-full text-[1.3rem] items-center justify-center">
                  {
                    createFinalMatches.determineChampion2(data?.semi || [])
                      ?.name
                  }
                </span>
                <div className="w-full flex items-center justify-center p-3">
                  <img className="max-h-[75px]" src="/world-cup.png" alt="" />
                </div>
              </div>

              <div className="w-full lg:w-1/3 md:w-full flex items-cenrer justify-center flex-wrap">
                <span className="w-full font-bold text-[#eebb1c] flex w-full text-[1.5rem] items-center justify-center">
                  {
                    createFinalMatches.determineChampion(data?.final || [])
                      ?.name
                  }
                </span>
                <div className="w-full flex items-center justify-center p-5">
                  <img className="max-h-[100px]" src="/world-cup.png" alt="" />
                </div>
              </div>

              <div className="w-full flex-col lg:w-1/3 md:w-full flex items-cenrer justify-center flex-wrap">
                <span className="w-full font-bold text-[#eebb1c] flex w-full text-[1.3rem] items-center justify-center">
                  {
                    createFinalMatches.determineChampion2(data?.final || [])
                      ?.name
                  }
                </span>
                <div className="w-full flex items-center justify-center p-3">
                  <img className="max-h-[75px]" src="/world-cup.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </Card.Item>
      )}

      {Number(data?.final.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <div className="w-full flex flex-wrap">
            <h4 className="w-full text-[1.2rem] font-bold uppercase">FINAL</h4>
            <div className="flex w-full flex-wrap">
              <Match matches={data?.final || []} />
            </div>
          </div>
        </Card.Item>
      )}

      {Number(data?.semi.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <div className="w-full flex flex-wrap">
            <h4 className="w-full text-[1.2rem] font-bold uppercase">SEMI</h4>
            <div className="flex w-full flex-wrap">
              <Match matches={data?.semi || []} />
            </div>
          </div>
        </Card.Item>
      )}

      {Number(data?.quarter.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <div className="w-full flex flex-wrap">
            <h4 className="w-full text-[1.2rem] font-bold uppercase">
              QUARTER
            </h4>
            <div className="flex w-full flex-wrap">
              <Match matches={data?.quarter || []} />
            </div>
          </div>
        </Card.Item>
      )}

      {Number(data?.qua.length) > 0 && (
        <Card.Item className="flex justify-between w-full">
          <div className="w-full flex flex-wrap">
            <h4 className="w-full text-[1.2rem] font-bold uppercase">
              Qualification
            </h4>
            <div className="flex w-full flex-wrap">
              <Match matches={data?.qua || []} />
            </div>
          </div>
        </Card.Item>
      )}
    </Card>
  );
}

export default SimulationNextMatch;

import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/card";
import DataTable, { ActionProps } from "@/components/datatable";
import Button from "@/components/forms/Buttons";
import { useService } from "@/hooks/useService";
import { fetchMiddleware } from "@/middleware/fetchMiddleware";
import {
  type MODEL as GroupModel,
  services as groupsService,
} from "@/services/groups";
import { type MODEL as PowerModel } from "@/services/power";
import { columns, type MODEL, type REQUEST, services } from "@/services/soccer";
import {
  type MODEL as Tournamed,
  services as tournamedServices,
} from "@/services/tournamed";
import { generateRandomSoccers } from "@/utils/generateRandomSoccers";
import Power from "./Power";

function Groups() {
  const navigate = useNavigate();

  const [groups, groupsDispatch] = useService<GroupModel>(groupsService);
  useEffect(() => {
    groupsDispatch.all();
  }, [groupsDispatch]);

  const [soccer, dispatch] = useService<MODEL, REQUEST>(services);
  const [tournamed, tournamedDispatch] =
    useService<Tournamed>(tournamedServices);

  const key = useParams<{ key: string }>()?.key;

  useEffect(() => {
    if (!tournamed.success) {
      tournamedDispatch.getCriteria({ key: key || "" });
    }
  }, [key, tournamed.success]);

  useEffect(() => {
    if (tournamed.entity?.id) {
      dispatch.criteria([{ tournamed: tournamed.entity }]);
    }
  }, [tournamed]);

  useEffect(() => {
    if (Number(soccer.entities?.length || 0) < 32) {
      const createTeams = async () => {
        if (tournamed.entity?.id || 0 > 0) {
          const toastId = toast.loading("Creating 32 teams...");

          try {
            const soccers = generateRandomSoccers(32, groups.entities || []);

            const response = await fetchMiddleware(
              "/soccer/all-create",
              "POST",
              [
                ...soccers.map((f) => ({
                  colors: f.colors,
                  country: f.country,
                  name: f.name,
                  power: f.power,
                  tournamed: tournamed.entity?.id,
                  groups: f.groups,
                })),
              ]
            );

            if (response.data?.length === 32) {
              dispatch.criteria([{ tournamed: tournamed.entity }]);

              toast.update(toastId, {
                render: "Created 32 / 32 teams successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
            } else {
              toast.update(toastId, {
                render: "Teams are already created",
                type: "warning",
                isLoading: false,
                autoClose: 3000,
              });
            }
          } catch (error) {
            toast.update(toastId, {
              render: "Failed to create teams: " + (error as Error).message,
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
            console.error("Team creation error:", error);
          }
        }
      };

      createTeams();
    }
  }, [soccer.entities]);

  const [show, setShow] = useState<boolean>(false);
  const [soccerFind, setSoccerFind] = useState<MODEL>({} as MODEL);
  const [powerFind, setPowerFind] = useState<PowerModel>({} as PowerModel);

  const action: ActionProps<MODEL> = {
    key: "action",
    actionName: "Skills",
    actions: [
      {
        action: async (v) => {
          await setPowerFind(v.power);
          await setSoccerFind(v);
          setShow(true);
        },
        icon: (
          <IoEyeSharp className="hover:text-[#000]" color="#1e293b" size={18} />
        ),
      },
    ],
  };

  return (
    <Card>
      {tournamed.entity?.id && (
        <>
          <Card.Item className="flex justify-between w-full">
            <Button
              onClick={() => navigate("/")}
              variant="danger"
              className="flex justify-between items-center"
            >
              <GrPrevious className="pr-[7.5px]" size={25} /> Back
            </Button>
            <span className="items-center text-[10pt] justify-center font-bold flex text-center p-5">
              {tournamed.entity.name}
            </span>
            <Button
              onClick={() => navigate("matches")}
              variant="dark"
              className="flex justify-between items-center"
            >
              Play Groups <GrNext className="pl-[7.5px]" size={25} />
            </Button>
          </Card.Item>

          <Card.Item className="w-full">
            <DataTable<MODEL, REQUEST>
              data={soccer}
              columns={columns}
              action={action}
              dispatch={{
                ...dispatch,
                all: () => dispatch.criteria([{ tournamed: tournamed.entity }]),
              }}
            />
          </Card.Item>
        </>
      )}

      {show && <Power soccer={soccerFind} data={powerFind} setShow={setShow} />}
    </Card>
  );
}

export default Groups;

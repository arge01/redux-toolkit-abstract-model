import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/components/card";
import DataTable from "@/components/datatable";
import { useService } from "@/hooks/useService";
import { fetchMiddleware } from "@/middleware/fetchMiddleware";
import { columns, MODEL, REQUEST, services } from "@/services/soccer";
import {
  MODEL as Tournamed,
  services as tournamedServices,
} from "@/services/tournamed";
import { generateRandomSoccers } from "@/utils/generateRandomSoccers";

function Groups() {
  const [loadRandomSoccer, setLoadRandomSoccer] = useState<boolean>(false);

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
    if (tournamed.findSuccess) {
      dispatch.criteria([{ tournamed: tournamed.entity }]);
    }
  }, [tournamed.findSuccess]);

  useEffect(() => {
    setLoadRandomSoccer(false);

    if (soccer.success) {
      if (tournamed.entity?.id) {
        if (soccer.findCriteriaSuccess) {
          if (Number(soccer.criteria?.length || 0) < 32) {
            const createTeams = async (tournamed: number) => {
              if (tournamed > 0) {
                const toastId = toast.loading("Creating 32 teams...");

                try {
                  const soccers = generateRandomSoccers(32);

                  const response = await fetchMiddleware(
                    "/soccer/all-create",
                    "POST",
                    [
                      ...soccers.map((f) => ({
                        colors: f.colors,
                        country: f.country,
                        name: f.name,
                        power: f.power,
                        tournamed,
                      })),
                    ]
                  );

                  if (response.data?.length === 32) {
                    setLoadRandomSoccer(true);

                    toast.update(toastId, {
                      render: "Created 32 / 32 teams successfully",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  } else {
                    toast.update(toastId, {
                      render: "Failed to create teams",
                      type: "error",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  }
                } catch (error) {
                  toast.update(toastId, {
                    render:
                      "Failed to create teams: " + (error as Error).message,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                  });
                  console.error("Team creation error:", error);
                }
              }
            };

            createTeams(tournamed.entity.id);
          } else {
            setLoadRandomSoccer(true);
          }
        }
      }
    }
  }, [
    soccer.success,
    soccer.findCriteriaSuccess,
    soccer.criteria,
    tournamed.entity,
  ]);

  useEffect(() => {
    if (loadRandomSoccer) {
      dispatch.all();

      setLoadRandomSoccer(false);
    }
  }, [loadRandomSoccer]);

  return (
    <Card>
      <Card.Item className="w-full">
        <DataTable<MODEL, REQUEST> data={soccer} columns={columns} />
      </Card.Item>
    </Card>
  );
}

export default Groups;

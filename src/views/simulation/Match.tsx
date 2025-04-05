/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Card from "@/components/card";
import { MODEL, FINAL, QUA, QUARTER, SEMI } from "@/services/matches";
import { type MODEL as PowerModel } from "@/services/power";
import { type MODEL as SoocerModel } from "@/services/soccer";
import Power from "./Power";

type Props = {
  matches: MODEL[] | FINAL[] | QUA[] | QUARTER[] | SEMI[];
};

function Match({ matches }: Props) {
  const penalty = (goal: number | undefined) =>
    goal ? `P: ${goal}` : undefined;

  const [show, setShow] = useState<boolean>(false);
  const [soccerFind, setSoccerFind] = useState<SoocerModel>({} as SoocerModel);
  const [powerFind, setPowerFind] = useState<PowerModel>({} as PowerModel);

  const handleShowPower = async (v: SoocerModel) => {
    await setPowerFind(v.power);
    await setSoccerFind(v);
    setShow(true);
  };
  return (
    <Card.Item className="w-full">
      {show && <Power soccer={soccerFind} data={powerFind} setShow={setShow} />}
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-bold mb-4">Match Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches?.map((match: any) => (
            <div
              key={match.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="text-right flex-1">
                  <p
                    onClick={() => handleShowPower(match.field)}
                    className="cursor-pointer font-medium hover:underline"
                  >
                    {match.field.name}
                  </p>
                  <p className="text-sm text-gray-500">{match.field.country}</p>
                </div>

                <div className="mx-4 flex flex-col items-center">
                  <div className="text-2xl font-bold">
                    {match.goal_field}{" "}
                    <span className="font-bold text-[1.2rem] text-[#767676]">
                      {penalty(match.goal_field_penalty)}
                    </span>{" "}
                    - {match.goal_outfield}{" "}
                    <span className="font-bold text-[1.2rem] text-[#767676]">
                      {penalty(match.goal_outfield_penalty)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(
                      match.created_at || new Date()
                    ).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-left cursor-pointer flex-1">
                  <p
                    onClick={() => handleShowPower(match.outfield)}
                    className="cursor-pointer font-medium hover:underline"
                  >
                    {match.outfield.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {match.outfield.country}
                  </p>
                </div>
              </div>

              {match.groups?.name && (
                <div className="mt-3 pt-2 border-t text-center text-sm text-gray-500">
                  Group {match.groups.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card.Item>
  );
}

export default Match;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "@/components/modal/Modal";
import { MODEL as Matches } from "@/services/matches";
import { MODEL as Soccer } from "@/services/soccer";
import { getFindTotalPoints } from "@/utils/getTotalPoints ";

type Props = {
  matches: Matches[];
  soccer: Soccer;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShowAllMatches({ soccer, matches, setShow }: Props) {
  return (
    <section className="modal fixed top-0 left-0">
      <Modal maxWidth title={soccer.name} setShow={setShow}>
        <div className="w-full rounded-lg shadow-md p-[15px] border-solid border-1 border border-slate-200 hover:border-slate-300">
          <section className="flex flex-wrap space-y-3 gap-[5px]">
            <div className="w-full flex flex-nowrap items-end gap-[5px]">
              <h4 className="font-bold text-[1.3rem]">Power: </h4>
              <ul className="flex flex-wrap w-full gap-[5px]">
                <ul className="flex flex-wrap w-full gap-[5px]">
                  {Object.entries(soccer.power)
                    .filter(
                      ([key]) =>
                        !["id", "created_at", "updated_at"].includes(key)
                    )
                    .map(([key, value]) => (
                      <li key={key} className="w-auto text-[10pt]">
                        {key} -{" "}
                        <i className="font-bold text-[1.2rem]">{value}</i> /
                      </li>
                    ))}
                </ul>
              </ul>
            </div>
            <div className="w-full flex flex-nowrap items-end gap-[5px]">
              <h4 className="font-bold text-[1.3rem]">Detail: </h4>
              <ul className="flex flex-wrap w-full gap-[5px]">
                {Object.entries(getFindTotalPoints(soccer, matches)).map(
                  ([key, value]) => (
                    <li key={key} className="w-auto text-[10pt]">
                      {key} - <i className="font-bold text-[1.2rem]">{value}</i>{" "}
                      /
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map((match: any) => (
                <div
                  key={match.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-right flex-1">
                      <p className="font-medium">{match.field.name}</p>
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
                      <p className="font-medium">{match.outfield.name}</p>
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
          </section>
        </div>
      </Modal>
    </section>
  );
}

export default ShowAllMatches;

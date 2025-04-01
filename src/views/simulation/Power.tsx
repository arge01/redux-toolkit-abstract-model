import Modal from "@/components/modal/Modal";
import { MODEL } from "@/services/power";
import { MODEL as Soccer } from "@/services/soccer";
import { SkillBar } from "@/utils/skillBar";

type Props = {
  data: MODEL;
  soccer: Soccer;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function Power({ data, soccer, setShow }: Props) {
  return (
    <section className="modal fixed top-0 left-0">
      <Modal title={soccer.name} setShow={setShow}>
        <div className="w-full rounded-lg shadow-md p-[15px] border-solid border-1 border border-slate-200 hover:border-slate-300">
          <h2 className="text-xl font-bold mb-[20px] border-b-[1px] text-gray-800">
            Skills
          </h2>
          <ul className="flex flex-wrap space-y-3 gap-[5px]">
            <SkillBar name="Team Power" value={data.power} />
            <SkillBar name="Playing With A Ball" value={data.playing} />
            <SkillBar name="Home Field" value={data.field} />
            <SkillBar name="Out Field" value={data.outfield} />
            <SkillBar name="Luck Ratio" value={data.fortunate} />
          </ul>
        </div>
      </Modal>
    </section>
  );
}

export default Power;

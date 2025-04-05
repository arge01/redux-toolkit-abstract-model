/* eslint-disable indent */
import { FaFlagCheckered } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import Button from "@/components/forms/Buttons";
import { Data } from "./SimulationNextMatch";

function SimulationNextMatchButton({
  loading,
  onClick,
  name,
}: {
  loading: boolean;
  onClick: () => void;
  name: Data["name"];
}): React.JSX.Element {
  switch (name) {
    case "qua":
      return (
        <Button
          onClick={onClick}
          loading={loading}
          variant="dark"
          className="flex justify-between items-center"
        >
          Play Qualification <GrNext className="pl-[7.5px]" size={25} />
        </Button>
      );

    case "quarter":
      return (
        <Button
          onClick={onClick}
          loading={loading}
          variant="dark"
          className="flex justify-between items-center"
        >
          Play Quarter <GrNext className="pl-[7.5px]" size={25} />
        </Button>
      );

    case "semi":
      return (
        <Button
          onClick={onClick}
          loading={loading}
          variant="dark"
          className="flex justify-between items-center"
        >
          Play Semi <GrNext className="pl-[7.5px]" size={25} />
        </Button>
      );

    case "final":
      return (
        <Button
          onClick={onClick}
          loading={loading}
          variant="dark"
          className="flex justify-between items-center"
        >
          Play Final <GrNext className="pl-[7.5px]" size={25} />
        </Button>
      );

    default:
      return (
        <Button
          loading={loading}
          variant="dark"
          className="flex justify-between items-center"
        >
          Final <FaFlagCheckered className="pl-[7.5px]" size={25} />
        </Button>
      );
  }
}

export default SimulationNextMatchButton;

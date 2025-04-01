import { Model } from "@/services";
import { MODEL } from "@/services/matches";

type Props = {
  matches: Model<MODEL>;
};

function Match({ matches }: Props) {
  return <>Page: {matches.pagination?.page}</>;
}

export default Match;

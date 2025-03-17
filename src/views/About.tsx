import { LayoutProviderValue } from "@/components/layout/Provider";
import { withLayout } from "@/components/layout/withLayout";

export type Props = {
  //Props Type
} & {
  layouProviderValue: LayoutProviderValue;
};

function About() {
  return <>About</>;
}

export default withLayout(About);

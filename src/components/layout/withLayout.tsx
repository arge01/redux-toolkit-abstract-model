import { LayoutProviderValue, useLayout } from "./Provider";

export function withLayout<P extends object>(
  WrappedComponent: React.ComponentType<
    P & { layouProviderValue: LayoutProviderValue }
  >
) {
  return (p: P) => {
    const layouProviderValue: LayoutProviderValue = useLayout();

    return <WrappedComponent {...p} layouProviderValue={layouProviderValue} />;
  };
}

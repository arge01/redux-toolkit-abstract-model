/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SetStateAction } from "react";
import { createContext, useContext } from "react";
import { LayoutProps } from ".";

export type LayoutProviderValue = {
  header?: LayoutProps["header"];
  setHeader?: React.Dispatch<React.SetStateAction<LayoutProps["header"]>>;

  footer?: LayoutProps["footer"];
  setFooter?: React.Dispatch<React.SetStateAction<LayoutProps["footer"]>>;

  token: LayoutProps["token"];
  setToken: LayoutProps["setToken"];
};

type Props = {
  children: React.ReactNode;
  value: LayoutProviderValue;
};

export const initialLayoutProvider: LayoutProviderValue = {
  header: undefined,
  setHeader: function (_: SetStateAction<boolean | undefined>): void {
    throw new Error("Function not implemented.");
  },
  footer: undefined,
  setFooter: function (_: SetStateAction<boolean | undefined>): void {
    throw new Error("Function not implemented.");
  },

  token: null,
  setToken: function (_: SetStateAction<null | string>): void {
    throw new Error("Function not implemented.");
  },
};

export const LayoutContext = createContext<LayoutProviderValue>(
  initialLayoutProvider
);

export function Provider({ value, children }: Props) {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);

export default Provider;

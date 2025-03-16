import { useMemo, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Provider, { LayoutProviderValue } from "./Provider";

export type LayoutProps = {
  children?: React.ReactNode;
  footer?: boolean;
  header?: boolean;
};

function L({ children, footer = true, header = true }: LayoutProps) {
  const [h, setH] = useState<LayoutProps["header"]>(header);
  const [f, setF] = useState<LayoutProps["footer"]>(footer);

  const memoizedValue: LayoutProviderValue = useMemo(
    () => ({
      header: h,
      setHeader: setH,

      footer: f,
      setFooter: setF,
    }),
    [h, f]
  );
  return (
    <Provider value={memoizedValue}>
      <>{memoizedValue.header && <Layout.Header />}</>
      {children}
      <Layout.Main />
      <>{memoizedValue.footer && <Layout.Footer />}</>
    </Provider>
  );
}

const Layout = Object.assign(L, {
  Header,
  Main,
  Footer,
});

export default Layout;

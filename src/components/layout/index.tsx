/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react";
import { getToken } from "@/utils/token";
import AuthLayout from "./AuthLayout";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Provider, { LayoutProviderValue } from "./Provider";

export type LayoutProps = {
  footer?: boolean;
  header?: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<LayoutProps["token"]>>;
};

function L({ token, setToken, footer = true, header = true }: LayoutProps) {
  const [h, setH] = useState<LayoutProps["header"]>(header);
  const [f, setF] = useState<LayoutProps["footer"]>(footer);

  const memoizedValue: LayoutProviderValue = useMemo(
    () => ({
      header: h,
      setHeader: setH,

      footer: f,
      setFooter: setF,

      token,
      setToken,
    }),
    [h, f]
  );
  return (
    <Provider value={memoizedValue}>
      <>
        {memoizedValue.header && <Layout.Header />}
        <Layout.Main />
        {memoizedValue.footer && <Layout.Footer />}
      </>
    </Provider>
  );
}

function index() {
  const [token, setToken] = useState<LayoutProps["token"]>(getToken());

  if (!getToken()) {
    return (
      <Provider value={{ token, setToken }}>
        <AuthLayout />
      </Provider>
    );
  } else {
    return <L token={token} setToken={setToken} />;
  }
}

const Layout = Object.assign(index, {
  Header,
  Main,
  Footer,
});

export default Layout;

import { Outlet } from "react-router-dom";

function Main() {
  return (
    <main className="max-w-screen-lg mx-auto lg:px-0 px-2.5">
      <Outlet />
    </main>
  );
}

export default Main;

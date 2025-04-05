import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout";
import Test from "@/tests/ReduxTest";
import About from "@/views/About";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import Login from "@/views/auth/Login";
import SignUp from "@/views/auth/SignUp";
import Simulation from "@/views/simulation";
import Groups from "@/views/simulation/Gruops";
import Matches from "@/views/simulation/Matches";
import SimulationNextMatch from "@/views/simulation/SimulationNextMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "play",
        children: [
          {
            path: "groups/:key",
            element: <Simulation />,
            children: [
              {
                index: true,
                element: <Groups />,
              },
              {
                path: "matches",
                element: <Matches />,
              },
              {
                path: "finals",
                element: <SimulationNextMatch />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;

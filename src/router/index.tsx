import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout";
import About from "@/views/About";
import Home from "@/views/Home";

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
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;

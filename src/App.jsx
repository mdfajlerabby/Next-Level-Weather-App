import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./layouts/MainLayout";
import Weather from "./pages/Weather";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },{
        path: "/weather",
        element : <Weather/>
      }
    ],
  },
  {
      path: "/about-us",
      element: <AboutUs/>,
  }

]);


function Router() {
  return (
    <RouterProvider router={router} />
  )
}

export default Router;

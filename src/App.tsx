import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayouts from "./layouts/app-layouts";
import LandingPage from "./pages/landing";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import LinkPage from "./pages/link";
import RedirectLink from "./pages/redirect-link";
import UrlProvider from "./context";

const router = createBrowserRouter([
  {
    element: <AppLayouts />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/link-page/:id",
        element: <LinkPage />,
      },

      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider Children={<RouterProvider router={router} />}></UrlProvider>
  );
}

export default App;

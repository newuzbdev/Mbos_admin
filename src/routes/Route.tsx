import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Notfound from "@/pages/Notfound";
import Services from "@/pages/Services";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router-dom";
// function authLoader({ request }: LoaderFunctionArgs) {
//   if (!isLoggedIn()) {
//     const params = new URLSearchParams();
//     params.set("to", new URL(request.url).pathname);
//     return redirect("/login?" + params.toString());
//   }
//   return null;
// }
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <Notfound />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);

import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Notfound from "@/pages/Notfound";
import Contract from "@/pages/Contract";
import Clients from "@/pages/Clients";
import { createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import { isLoggedIn, login, logout } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types/auth";
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

function authLoader({ request }: LoaderFunctionArgs) {
  if (!isLoggedIn()) {
    const params = new URLSearchParams();
    params.set("to", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
    errorElement: <Notfound />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contract",
        element: <Contract />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
    ],
  },
]);

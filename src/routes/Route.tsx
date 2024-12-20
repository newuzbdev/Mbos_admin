import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Notfound from "@/pages/Notfound";
import Contract from "@/pages/Contract";
import Service from "@/pages/Service";
import Clients from "@/pages/Clients";

import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { isLoggedIn, login, logout } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/types/auth";
import Income from "@/pages/Income.tsx";
import ContractDetails from "@/components/pages/contracts/ContractDetails";
import ServiceDetails from "@/components/pages/service/ServiceDetails";
import ClientsDetailts from "@/components/pages/clients/ClientsDetailts";
import Product from "@/pages/Product";
import ContractPaid from "@/pages/ContractPaid";
import ContractUnpaid from "@/pages/ContractUnpaid";
import IncomeProfit from "@/pages/IncomeProfit";
import MoneySpend from "@/pages/MoneySpend";
import ServerData from "@/pages/Server";
import ServerDetails from "@/components/pages/server/ServerDetails";
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
        path: "/contract/paid",
        element: <ContractPaid />,
      },
      {
        path: "/contract/unpaid",
        element: <ContractUnpaid />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/:clientsId",
        element: <ClientsDetailts />,
      },
      {
        path: "/contract/:contractId",
        element: <ContractDetails />,
      },
      {
        path: "/income",
        element: <Income />,
      },
      {
        path: "/income/profit",
        element: <IncomeProfit />,
      },
      {
        path: "/income/moneyspend",
        element: <MoneySpend />,
      },
      {
        path: "/server",
        element: <ServerData/>,
      },
      {
        path: "/server/:serverId",
        element: <ServerDetails />,
      },
    ],
  },
]);

import App from "@/App";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <App />,
      },
    //   {
    //     path: "/visits",
    //     element: <Visits />,
    //   },
    ],
  },
]);

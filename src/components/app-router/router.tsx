import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import { routesInfo } from "./routes"

export const appRouter = createBrowserRouter([
  {
    path: routesInfo.root.path,
    element: routesInfo.root.element,
    children: [
      {
        element: routesInfo.layout.element,
        children: [
          {
            path: routesInfo.home.path,
            element: routesInfo.home.element,
            children: [
              {
                id: routesInfo.ingredientItem.id,
                path: routesInfo.ingredientItem.path,
                element: routesInfo.ingredientItem.element,
              },
            ],
          },
          routesInfo.login as RouteObject,
          routesInfo.register as RouteObject,
        ],
      },
      {
        ...routesInfo.errorPage,
      },
      {
        path: "*",
        element: <Navigate replace to={routesInfo.errorPage.path} />,
      },
    ],
  },
])

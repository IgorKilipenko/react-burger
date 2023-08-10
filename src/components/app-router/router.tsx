import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import { AppPaths, routesInfo } from "./routes"

export const appRouter = createBrowserRouter(
  [
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
            {
              element: routesInfo.ordersFeed.element,
              path: routesInfo.ordersFeed.path,
              children: [
                {
                  id: routesInfo.ordersFeedItem.id,
                  path: routesInfo.ordersFeedItem.path,
                  element: routesInfo.ordersFeedItem.element,
                },
              ],
            },
            {
              element: routesInfo.profileContainer.element,
              children: [
                {
                  element: routesInfo.profileLayout.element,
                  children: [
                    routesInfo.profile as RouteObject,
                    {
                      element: routesInfo.ordersList.element,
                      path: routesInfo.ordersList.path,
                      children: [
                        {
                          id: routesInfo.ordersListItem.id,
                          path: routesInfo.ordersListItem.path,
                          element: routesInfo.ordersListItem.element,
                        },
                      ],
                    },
                  ],
                },
                routesInfo.forgotPassword as RouteObject,
                routesInfo.resetPassword as RouteObject,
                routesInfo.login as RouteObject,
                routesInfo.register as RouteObject,
              ],
            },
          ],
        },
        routesInfo.errorPage as RouteObject,
        {
          path: AppPaths.NOT_FOUND_PAGE,
          element: <Navigate replace to={routesInfo.errorPage.path} />,
        },
      ],
    },
  ],
  { basename: AppPaths.ROOT_PATH }
)

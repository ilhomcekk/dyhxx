import { APP_ROUTES } from ".";
import { Category, Home, Service } from "../views";

export const _routes = [
  {
    path: APP_ROUTES.HOME,
    element: Home,
    exact: true,
  },
  {
    path: APP_ROUTES.CATEGORY,
    element: Category,
  },
  {
    path: APP_ROUTES.SERVICE,
    element: Service,
  },
];
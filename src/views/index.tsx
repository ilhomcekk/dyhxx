import { lazy } from "react";

const Home = lazy(() => import("./home/view"));
const Category = lazy(() => import("./category/view"));
const Service = lazy(() => import("./service/view"));

export { Home, Category, Service };

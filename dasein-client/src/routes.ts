import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import { Calendar } from "./pages/calendar";
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];

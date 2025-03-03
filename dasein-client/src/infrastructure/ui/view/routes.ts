import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import { Calendar } from "./pages/calendar";
import { NewTeacher } from "./pages/teachers/new_teacher";
import { ListTeachers } from "./pages/teachers/list_teachers";
export const routes: RouteDefinition[] = [
  {
    path: "/",
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/teachers",
        children: [
          {
            path: "/",
            component: ListTeachers,
          },
          {
            path: "/new",
            component: NewTeacher,
          },
        ],
      },
      {
        path: "/calendar",
        component: Calendar,
      },
    ],
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
  },
  {
    path: "**",
    component: lazy(() => import("./pages/errors/404")),
  },
];

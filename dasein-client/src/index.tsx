/* @refresh reload */
import "./infrastructure/ui/styles/index.css";

import { render, Suspense } from "solid-js/web";

import App from "./infrastructure/ui/view/app";
import { Router } from "@solidjs/router";
import { routes } from "./infrastructure/ui/view/routes";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <Router root={App}>{routes}</Router>, root);

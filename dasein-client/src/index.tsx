/* @refresh reload */
import "./infrastructure/ui/styles/index.css";

import { render, Suspense } from "solid-js/web";

import App from "./infrastructure/ui/view/layout";
import { Router } from "@solidjs/router";
import { routes } from "./infrastructure/ui/view/routes";
import { createApp } from "./domain/app";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const app = createApp();

render(app.renderSink, root);

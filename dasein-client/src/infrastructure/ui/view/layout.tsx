import { Suspense, type Component } from "solid-js";
import { Header } from "./components/header";

const App: Component = (props: { children: Element }) => {
  return (
    <>
      <Header />
      <main>
        <Suspense>{props.children}</Suspense>
      </main>
    </>
  );
};

export default App;

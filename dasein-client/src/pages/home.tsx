import { createSignal } from "solid-js";

const [count, setCount] = createSignal(0);

const partialCount = (count: number) => {
  if (count > 10) {
    return "Too big!";
  }
  return String(count);
};

export default function Home() {
  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Home</h1>
      <p class="mt-4">This is the home page.</p>

      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() - 1)}
        >
          -
        </button>

        <output class="p-10px">Count: {partialCount(count())}</output>

        <button
          type="button"
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>
      </div>
    </section>
  );
}

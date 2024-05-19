import { Suspense } from "react";
import "./App.css";
import { Demo } from "./Demo";

function App() {
  return (
    <Suspense
      fallback={
        <div className="grid  place-content-center h-screen">
          <p className="">Loading...</p>
        </div>
      }
    >
      <Demo />
    </Suspense>
  );
}

export default App;

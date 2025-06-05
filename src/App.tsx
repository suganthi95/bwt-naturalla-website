// App.tsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Provider from "./providers/Provider";
import Layout from "./layout/Layout";

// Lazy-loaded page
const Home = React.lazy(() => import("./website/Home"));

const App = () => {
  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;

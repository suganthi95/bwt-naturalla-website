// App.tsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Provider from "./providers/Provider";
import Layout from "./components/layout/Layout";

// Lazy-loaded page
const Home = React.lazy(() => import("./website/Home"));
const ProductById = React.lazy(() => import("@/pages/ProductById"));
const CheckoutPage = React.lazy(() => import("@/pages/CheckoutPage"));

const App = () => {
  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductById />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;

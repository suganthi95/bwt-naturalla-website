// App.tsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Provider from "./providers/Provider";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./common/ScrollToTop";

// Lazy-loaded page
const Home = React.lazy(() => import("./website/Home"));
const ProductById = React.lazy(() => import("@/pages/ProductById"));
const CheckoutPage = React.lazy(() => import("@/pages/CheckoutPage"));
const OrderSuccess = React.lazy(() => import("@/pages/Order_Success"));
const OrderFailure = React.lazy(() => import("@/pages/Order_Failure"));
const Myprofile = React.lazy(() => import("@/pages/Myprofile"));

const App = () => {
  return (
    <Provider>
      <Suspense fallback={<div>Loading...</div>}>
          <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductById />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-failure" element={<OrderFailure />} />
            <Route path="/my-profile" element={<Myprofile />} />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;

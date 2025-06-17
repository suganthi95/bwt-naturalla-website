// App.tsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Provider from "./providers/Provider";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./common/ScrollToTop";
import FullScreenLoader from "./common/FullScreenLoader";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Lazy-loaded page

const Home = React.lazy(() => import("./website/Home"));
const SignUp = React.lazy(() => import("./pages/Signup"));
const Login = React.lazy(() => import("./pages/Login"));
const SignupVerify = React.lazy(() => import("./pages/SignupVerify"));
const LoginVerify = React.lazy(() => import("./pages/LoginVerify"));

const ProductById = React.lazy(() => import("@/pages/ProductById"));
const Products = React.lazy(() => import("@/website/Products"));
const CheckoutPage = React.lazy(() => import("@/pages/CheckoutPage"));
const OrderSuccess = React.lazy(() => import("@/pages/Order_Success"));
const OrderFailure = React.lazy(() => import("@/pages/Order_Failure"));
const Myprofile = React.lazy(() => import("@/pages/Myprofile"));
const PaymentMethod = React.lazy(() => import("@/pages/PaymentMethod"));

const App = () => {
  return (
    <Provider>
      <Suspense fallback={<FullScreenLoader />}>
        <ScrollToTop />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up-verify" element={<SignupVerify />} />
          <Route path="/login-verify" element={<LoginVerify />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductById />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentMethod />
                </ProtectedRoute>
              }
            />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-failure" element={<OrderFailure />} />
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute>
                  <Myprofile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;

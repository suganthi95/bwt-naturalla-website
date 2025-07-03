import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./common/ErrorBoundary.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Toaster />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

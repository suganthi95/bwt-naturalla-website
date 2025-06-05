// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./website/Home";
import Provider from "./providers/Provider";

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
};

export default App;

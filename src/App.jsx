// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SEOInterface } from "./components";
import { SEOContextProvider } from "./context/SEOContext";

function App() {
  return (
    <SEOContextProvider>
      <Routes>
        <Route path="/*" element={<SEOInterface />} />
      </Routes>
    </SEOContextProvider>
  );
}

export default App;

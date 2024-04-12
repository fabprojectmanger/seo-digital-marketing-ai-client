// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SEOInterface } from "./components";
import { SEOContextProvider } from "./context/SEOContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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

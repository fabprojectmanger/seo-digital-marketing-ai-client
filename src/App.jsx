// App.js
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SEOInterface } from "./components";
import { SEOContextProvider } from "./context/SEOContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    redirectToHomepageOnReload();
  }, [location]);

  function redirectToHomepageOnReload() {
    const currentRoute = location.pathname;
    if (currentRoute === "/") {
      sessionStorage.removeItem("visited_routes");
      return;
    }

    const visitedRoutes = JSON.parse(sessionStorage.getItem("visited_routes")) || [];
    if (visitedRoutes.includes(currentRoute)) {
      navigate("/");
      window.location.reload();
    } else {
      visitedRoutes.push(currentRoute);
      sessionStorage.setItem("visited_routes", JSON.stringify(visitedRoutes));
    }
  }

  return (
    <SEOContextProvider>
      <Routes>
        <Route path="/*" element={<SEOInterface />} />
      </Routes>
    </SEOContextProvider>
  );
}

export default App;

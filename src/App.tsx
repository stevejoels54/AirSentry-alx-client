import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import AppLoading from "./components/AppLoading";
import NotFound from "./components/NotFound";
import Auth from "./pages/auth";
import { auth } from "./firebase";

const Home = React.lazy(() => import("./pages/Home"));

// check if user is logged in and redirect to login page if not
auth.onAuthStateChanged((user) => {
  if (!user && window.location.pathname !== "/auth") {
    window.location.href = "/auth";
  }
});

const App = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} errorElement={<NotFound />} />
          <Route path="/auth" element={<Auth />} errorElement={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;

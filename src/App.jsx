import { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./pages/onboarding/SplashScreen";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      )}
    </>
  );
}

export default App;

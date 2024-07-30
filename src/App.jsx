import { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { ContextProvider } from "./contexts/ContextProvider";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 2000ms default
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <SpeedInsights />
        {loading ? (
          <SplashScreen />
        ) : (
          <div>
            <ContextProvider>
              <RouterProvider router={router} />
            </ContextProvider>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

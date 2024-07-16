import { useEffect, useState } from "react";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

function App() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   });
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <>
      <div className="w-full h-screen">
        {/* {loading ? (
        <SplashScreen />
      ) : (
      )} */}
        <div>
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App;

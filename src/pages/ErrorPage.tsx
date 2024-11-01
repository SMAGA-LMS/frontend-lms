import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();
  console.log(error);

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
        404 - Page Not Found
      </h1>
      <button
        onClick={navigateToHome}
        className="px-4 py-2 bg-smagaLMS-gray text-white font-bold rounded hover:bg-smagaLMS-green transition"
      >
        Home
      </button>
    </div>
  );
}

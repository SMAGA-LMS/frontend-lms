import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <pre>{error.message || "Unknown error"}</pre>
    </div>
  );
}

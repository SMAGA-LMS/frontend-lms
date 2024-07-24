import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const { error } = useRouteError();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

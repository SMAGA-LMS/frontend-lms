import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const { error } = useRouteError();

  return (
    <div>
      <h1>Custom Error di components/ui/ErrorPage.jsx</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

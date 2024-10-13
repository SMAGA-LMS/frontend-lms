export interface Errors {
  [key: string]: string[];
}

export default function ErrorDisplay({ errors }: { errors: Errors }) {
  return (
    <div className="text-red-500 text-sm text-center">
      {Object.keys(errors).map((key) =>
        errors[key].map((error, index) => (
          <p key={`${key}-${index}`}>{error}</p>
        ))
      )}
    </div>
  );
}

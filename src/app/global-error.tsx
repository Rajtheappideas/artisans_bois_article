"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          role="alert"
          className="h-screen space-y-2"
          style={{ margin: "1rem", color: "red" }}
        >
          <p>Something went wrong:</p>
          <pre style={{ color: "red" }}>{error.message}</pre>
          <button
            onClick={() => window.location.reload()}
            className="blue_button"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}

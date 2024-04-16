import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);

      // You can log the error or perform additional actions here
      console.error("Uncaught error:", error, errorInfo);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (hasError) {
    // Render your fallback UI here
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>{error && error.toString()}</p>
        <pre>{errorInfo && errorInfo.componentStack}</pre>
      </div>
    );
  }

  // Render the children if no error occurred
  return children;
};

export default ErrorBoundary;

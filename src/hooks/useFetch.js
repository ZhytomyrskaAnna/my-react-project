import { useState, useCallback } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performFetch = useCallback(async (apiCallFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCallFunc();
      setData(result);
    } catch (err) {
      setError(err.message || "Сталася помилка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, performFetch };
};
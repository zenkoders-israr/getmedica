export const getErrorMessage = (error) => {
  return (
    error.response?.data?.message || error.message || "Something went wrong"
  );
};

export const addParam = (obj) => {
  const queryString = Object.entries(obj)
    .reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
      return acc;
    }, [])
    .join("&");

  return queryString ? `?${queryString}` : "";
};

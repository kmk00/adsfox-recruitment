export const fetchData = async <T>(apiUrl: string): Promise<T> => {
  const response = await fetch(apiUrl);
  const data: T = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch the data from the API");
  }
  return data;
};

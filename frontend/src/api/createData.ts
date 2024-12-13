export const createData = async <T>(url: string, data: T): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const newData: T = await response.json();
  return newData;
};

export const deleteData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data: T = await response.json();
  return data;
};

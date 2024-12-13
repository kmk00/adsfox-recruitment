export const updateData = async <T>(url: string, newData: T): Promise<T> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    const { error }: { error: string } = await response.json();
    throw new Error(error);
  }

  const data: T = await response.json();
  return data;
};

type Methods = "POST" | "GET" | "PUT" | "DELETE";

export const handleApi = async <T>(
  url: string,
  method: Methods,
  data?: T
): Promise<ApiResponse<T>> => {
  if (!["POST", "PUT", "DELETE", "GET"].includes(method)) {
    throw new Error("Invalid method");
  }

  if (method === "POST" || method === "PUT") {
    if (!data) {
      throw new Error("Data is required");
    }
  }

  let response: Response = new Response();

  if (method === "POST" || method === "PUT") {
    response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  if (method === "DELETE" || method === "GET") {
    response = await fetch(url, {
      method: method,
    });
  }

  if (!response.ok) {
    const { error }: { error: string } = await response.json();
    throw new Error(error);
  }

  return await response.json();
};

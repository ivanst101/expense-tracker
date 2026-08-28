import type { LoginType } from "@/types/formTypes";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(data: LoginType) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to login");
  }

  return result;
}

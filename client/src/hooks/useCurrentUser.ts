import type { User } from "@/types/SignUpTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user!");
  }

  const result = await response.json();
  return result.data.user;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

async function logoutUser() {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return response.json();
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });

      navigate("/login");
    },
  });
}

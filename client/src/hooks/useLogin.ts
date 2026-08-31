import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSignup() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("https://your-backend.com/api/auth/signup", data);
      return res.data;
    },
  });
}

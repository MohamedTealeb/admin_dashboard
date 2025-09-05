import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useLogin() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("https://your-backend.com/api/auth/login", data);
      return res.data; 
    },
  });
}}
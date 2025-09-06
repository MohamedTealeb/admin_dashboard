"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useEmailConfirm() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.patch("http://localhost:4000/auth/confirm-email", data);
      return res.data;
    },
  });
}



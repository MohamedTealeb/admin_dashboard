"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode_toggle.jsx";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // إذا كان المستخدم مسجل دخول بالفعل، وجهه إلى الداشبورد
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/dashboard_home");
      }
    }
  }, [router]);

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:4000/auth/login?", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login response:", data);
      if (typeof window !== 'undefined') {
        // استخراج الـ token من المكان الصحيح
        const token = data.data?.credentials?.access_token;
        if (token) {
          localStorage.setItem("token", token);
          router.push("/dashboard_home");
        } else {
          console.error("Token not found in response:", data);
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div>
      <div className="right-5 top-3 fixed">
        <ModeToggle />
      </div>

      <Card className="w-full max-w-sm m-auto mt-40">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full" disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? "Loading..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              {loginMutation.isError && (
                <p className="text-red-500 text-sm">❌ Invalid credentials</p>
              )}
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="/signup" className="underline hover:text-primary">
                  Sign up here
                </a>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

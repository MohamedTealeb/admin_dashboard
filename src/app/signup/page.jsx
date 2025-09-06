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

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:4000/auth/signup?lang=ar", data);
      return res.data;
    },
    onSuccess: (data) => {
      // Don't store token yet - user needs to verify email first
      router.push(`/confirm-email?email=${encodeURIComponent(email)}`); 
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate({ fullName, email, password, phone });
  };

  return (
    <div>
      <div className="right-5 top-3 fixed">
        <ModeToggle />
      </div>

      <Card className="w-full max-w-sm m-auto mt-20">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full" disabled={signupMutation.isLoading}>
                {signupMutation.isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
              {signupMutation.isError && (
                <p className="text-red-500 text-sm">❌ Failed to create account</p>
              )}
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="underline hover:text-primary">
                  Login here
                </a>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

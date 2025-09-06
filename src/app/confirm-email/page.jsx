"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useEmailConfirm } from "@/hooks/useEmailConfirm";
import { Mail, Timer } from "lucide-react";

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(true);
  const inputRefs = useRef([]);

  const emailConfirmMutation = useEmailConfirm();

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Check authentication and email parameter
  useEffect(() => {
    const checkAccess = () => {
      // If no email parameter, redirect to signup
      if (!email) {
        router.push("/signup");
        return;
      }

      // Check if already authenticated
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        if (token) {
          router.push("/login");
          return;
        }
      }

      // All checks passed, show the page
      setIsLoading(false);
    };

    checkAccess();
  }, [email, router]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.replace(/\D/g, "").slice(0, 6).split("");
    
    const newOtp = [...otp];
    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      return;
    }

    emailConfirmMutation.mutate(
      { email, otp: otpCode },
      {
        onSuccess: (data) => {
          console.log("Email confirm response:", data);
          if (typeof window !== 'undefined') {
            // استخراج الـ token من المكان الصحيح
            const token = data.data?.credentials?.access_token;
            if (token) {
              localStorage.setItem("token", token);
              router.push("/dashboard_home");
            } else {
              router.push("/login");
            }
          }
        },
      }
    );
  };


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  // Show loading or nothing while checking access
  if (isLoading) {
    return (
      <div>
        <div className="right-5 top-3 fixed">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="right-5 top-3 fixed">
        <ModeToggle />
      </div>

      <Card className="w-full max-w-md m-auto mt-20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit verification code to
            <br />
            <span className="font-semibold text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Enter verification code</Label>
                <div className="flex gap-2 mt-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-lg font-semibold"
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>Code expires in {formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Code has expired. Please request a new one.
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full"
            disabled={!isOtpComplete || emailConfirmMutation.isPending}
          >
            {emailConfirmMutation.isPending ? "Verifying..." : "Verify Email"}
          </Button>


          {emailConfirmMutation.isError && (
            <p className="text-red-500 text-sm text-center">
              ❌ {emailConfirmMutation.error?.response?.data?.message || 
                   "Something went wrong. Please try again."}
            </p>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="underline hover:text-primary"
            >
              Change email address
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // إعادة توجيه إلى صفحة التسجيل أو الملف الشخصي حسب حالة المصادقة
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/dashboard_home");
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  );
}

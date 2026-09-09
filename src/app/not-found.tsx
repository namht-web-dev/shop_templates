"use client";
import "./globals.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Hiệu ứng đốm sáng nền (Background Glow Effect) */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="max-w-md w-full text-center border-border/50 shadow-xl backdrop-blur-sm bg-card/80 z-10">
        <CardHeader className="flex flex-col items-center pb-2">
          {/* Badge & Icon */}
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs gap-1">
            <FileQuestion className="w-3.5 h-3.5 text-muted-foreground" />
            404 Error
          </Badge>

          {/* Con số 404 ấn tượng */}
          <h1 className="text-8xl font-black tracking-tight text-primary select-none drop-shadow-sm">
            404
          </h1>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          <h2 className="text-2xl font-bold tracking-tight">Page not Found</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
          {/* Nút Quay lại */}
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Nút Về trang chủ */}
          <Button asChild className="w-full sm:w-auto gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Back to homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

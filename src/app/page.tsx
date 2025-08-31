"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdLancerIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <AdLancerIcon className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">AdLancer</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome to AdLancer</CardTitle>
            <CardDescription>Login to start earning points!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/dashboard">Login with Telegram</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/admin">Admin Login</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

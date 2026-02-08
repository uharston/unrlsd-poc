"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render dashboard content if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-50 mb-2">
              Welcome back, {session.user?.name || "User"}
            </h1>
            <p className="text-zinc-400">
              {session.user?.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-900 text-zinc-50"
          >
            Logout
          </Button>
        </div>

        {/* Status Card */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl text-zinc-50">
              You're logged in!
            </CardTitle>
            <CardDescription className="text-zinc-400 text-base">
              Your account is active and ready to go.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm mb-2">Next Steps:</p>
              <p className="text-zinc-300">
                Profile onboarding coming next
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-50">Profile Setup</CardTitle>
              <CardDescription className="text-zinc-400">
                Complete your professional profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 text-sm">
                Coming soon: Select your role (Beatmaker, Artist, Artistic Director) and complete your profile.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-50">Quick Stats</CardTitle>
              <CardDescription className="text-zinc-400">
                Your activity overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-500 text-sm">
                Coming soon: View your beats, locks, and collaboration activity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

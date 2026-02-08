"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { Music, Mic, Briefcase } from "lucide-react";

type ProfileRole = "beatmaker" | "artist" | "artistic_director";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [selectedRoles, setSelectedRoles] = useState<ProfileRole[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const toggleRole = (role: ProfileRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRoles.length === 0) {
      alert("Please select at least one role");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Create profile records in database via API route
      // For now, just redirect to dashboard
      console.log("Selected roles:", selectedRoles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create profiles:", error);
      alert("Failed to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const roles = [
    {
      id: "beatmaker" as ProfileRole,
      icon: Music,
      title: "Beatmaker / Producer",
      description: "I create instrumentals and beats for artists to use",
    },
    {
      id: "artist" as ProfileRole,
      icon: Mic,
      title: "Artist",
      description: "I'm looking for beats to lock and record on",
    },
    {
      id: "artistic_director" as ProfileRole,
      icon: Briefcase,
      title: "Artistic Director / A&R",
      description: "I curate and send beats to artists on my roster",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Welcome to UNRLSD</h1>
          <p className="text-zinc-400">
            Let's set up your profile. Select all roles that apply to you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRoles.includes(role.id);

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "bg-zinc-800 border-zinc-600"
                      : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                  }`}
                  onClick={() => toggleRole(role.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-zinc-50 border-zinc-50"
                            : "border-zinc-700"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-black"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <Icon className="w-6 h-6 text-zinc-400" />
                    </div>
                    <CardTitle className="text-lg text-zinc-50">
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-zinc-400 text-sm">
                      {role.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-zinc-50 text-black hover:bg-zinc-200 px-8"
              disabled={isSubmitting || selectedRoles.length === 0}
            >
              {isSubmitting ? "Setting up..." : "Continue to Dashboard"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-900 text-zinc-50"
              onClick={() => router.push("/dashboard")}
            >
              Skip for now
            </Button>
          </div>
        </form>

        {selectedRoles.length === 0 && (
          <p className="text-zinc-500 text-sm mt-4">
            Select at least one role to continue
          </p>
        )}
      </div>
    </div>
  );
}

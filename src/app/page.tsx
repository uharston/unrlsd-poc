import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileMusic } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-50">
      {/* Hero Section */}
      <section className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Where Elite Producers
              <br />
              <span className="text-zinc-400">Meet Top Artists</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              UNRLSD is the exclusive platform connecting verified music industry professionals.
              Structured beat discovery, transparent locking workflow, and trusted publishing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-zinc-50 text-black hover:bg-zinc-200 text-base px-8">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-900 text-base px-8">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">Why UNRLSD</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                <Shield className="w-12 h-12 mb-4 text-zinc-400" />
                <CardTitle className="text-xl text-zinc-50">Verified Professionals Only</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base leading-relaxed">
                  Curated network of established beatmakers, artists, A&R directors, labels, and publishers. 
                  No noise. No amateurs. Just serious business.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                <Lock className="w-12 h-12 mb-4 text-zinc-400" />
                <CardTitle className="text-xl text-zinc-50">Structured Beat Locking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base leading-relaxed">
                  7-day temporary holds or definitive locks with automatic stems delivery workflows. 
                  Clear commitments. No ambiguity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                <FileMusic className="w-12 h-12 mb-4 text-zinc-400" />
                <CardTitle className="text-xl text-zinc-50">UNRLSD as Publisher</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400 text-base leading-relaxed">
                  We act as the trusted music publisher, structuring and preparing works for professional exploitation. 
                  Third-party integrity built in.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  01
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Explore curated beat catalogs from verified producers. Filter by genre, BPM, and placement history.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  02
                </div>
                <h3 className="text-xl font-semibold mb-3">Lock</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Secure exclusive rights with temporary (7-day) or definitive locks. Clear, professional commitments.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  03
                </div>
                <h3 className="text-xl font-semibold mb-3">Stems</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Receive full stems within 5 days of definitive lock. UNRLSD handles publishing and rights management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-zinc-400 text-sm">
              © 2026 UNRLSD. Professional music industry platform.
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="#" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

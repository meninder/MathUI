import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from '@/components/Layout';
import Home from "@/pages/Home";
import { MultiplesHopper } from "@/components/games/MultiplesHopper";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ArithmeticGame from "@/components/arithmetic/ArithmeticGame";
import { MultiplesHopperSetup } from "@/components/games/MultiplesHopperSetup";
import { cn } from "@/lib/utils";
import { ArithmeticProvider } from '@/contexts/ArithmeticContext';

const queryClient = new QueryClient();

function App() {
  const [multiplesConfig, setMultiplesConfig] = useState<{
    difficulty: "easy" | "medium" | "hard";
    questionCount: number;
  } | null>(null);

  const handleMultiplesStart = (difficulty: "easy" | "medium" | "hard", questionCount: number) => {
    setMultiplesConfig({ difficulty, questionCount });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                  <nav className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                      Math Games
                    </Link>
                    <div className="flex gap-4">
                      <Link to="/arithmetic">
                        <Button variant="ghost">Arithmetic Practice</Button>
                      </Link>
                      <Link to="/multiples">
                        <Button variant="ghost">Multiples Hopper</Button>
                      </Link>
                    </div>
                  </nav>
                </div>
              </header>

              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/arithmetic"
                    element={
                      <ArithmeticProvider>
                        <ArithmeticGame />
                      </ArithmeticProvider>
                    }
                  />
                  <Route
                    path="/multiples"
                    element={
                      multiplesConfig ? (
                        <MultiplesHopper
                          difficulty={multiplesConfig.difficulty}
                          questionCount={multiplesConfig.questionCount}
                          onComplete={(score: number) => {
                            console.log(score);
                            setMultiplesConfig(null);
                          }}
                        />
                      ) : (
                        <MultiplesHopperSetup onStart={handleMultiplesStart} />
                      )
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">404</h1>
                        <p className="text-muted-foreground mb-4">
                          Page not found. The page you are looking for doesn't exist or
                          has been moved.
                        </p>
                        <Link to="/">
                          <Button>Go Home</Button>
                        </Link>
                      </div>
                    }
                  />
                </Routes>
              </main>

              <Toaster />
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

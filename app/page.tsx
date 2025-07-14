'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, UploadCloud, BarChart4, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen pt-36 bg-gradient-to-br from-background-50 via-background to-accent-background py-20 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-bold text-accent-foreground leading-tight mb-4">
          ResumeRite
        </h1>
        <p className="text-secondary-foreground text-lg mb-6">
          Boost your resume with AI-powered analysis and personalized suggestions for your dream role.
        </p>

        <Link href="/resume">
          <Button size="lg" className="rounded-xl  text-lg text-white hover:bg-indigo-800 bg-indigo-600">
            Upload Your Resume
          </Button>
        </Link>
      </motion.div>

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
        <FeatureCard
          icon={<UploadCloud className="w-6 h-6 text-indigo-600" />}
          title="PDF Upload"
          desc="Easily upload your resume as a PDF. No manual input required."
        />
        <FeatureCard
          icon={<Brain className="w-6 h-6 text-indigo-600" />}
          title="Gemini AI Insight"
          desc="Analyze resumes with Google's Gemini 1.5 Pro to get expert feedback."
        />
        <FeatureCard
          icon={<BarChart4 className="w-6 h-6 text-indigo-600" />}
          title="Score & Tips"
          desc="Get a score out of 100 and clear improvements for any job role."
        />
        <FeatureCard
          icon={<Sparkles className="w-6 h-6 text-indigo-600" />}
          title="Boost Recommendations"
          desc="Add missing skills, keywords, and standout phrases for recruiters."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="transition-all"
    >
      <Card className="rounded-2xl shadow-md backdrop-blur-sm bg-white/70 dark:bg-background/80">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-foreground/50">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

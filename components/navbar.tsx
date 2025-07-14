'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Sparkles } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
            <div className="bg-white/70 dark:bg-background/80 backdrop-blur-md border border-gray-200 rounded-full shadow-md px-6 py-2 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 font-semibold text-foreground text-lg hover:opacity-80 transition">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    ResumeRite
                </Link>

                <nav className="flex gap-4 items-center text-sm">
                    <Link
                        href="/"
                        className="text-foreground hover:text-indigo-600 transition font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/resume"
                        className="text-foreground hover:text-indigo-600 transition font-medium"
                    >
                        Analyze
                    </Link>
                    <a
                        href="https://github.com/your-repo" // replace this
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                    >
                        <Button className='hover:text-indigo-200 bg-indigo-600 text-white hover:bg-indigo-800 transition flex items-center gap-1'>
                            <Github className="w-4 h-4" />
                            GitHub
                        </Button>
                    </a>

                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}

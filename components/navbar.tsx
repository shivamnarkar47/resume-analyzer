'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Sparkles, User, File } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { NavBar } from "@/components/ui/tubelight-navbar"

export default function Navbar() {

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Analyze', url: '/resume', icon: File },
    ]
    return (



        <NavBar
            items={navItems}
        />

    );
}

"use client";
import dynamic from "next/dynamic";
import { NextAuthProvider } from "@/lib/next-auth/provider";

const Timer = dynamic(() => import("@/features/timer/Timer"), {
    ssr: false,
});

export default function Home() {
    return (
        <NextAuthProvider>
            <main className="relative w-screen max-h-screen">
                <Timer />
            </main>
        </NextAuthProvider>
    );
}

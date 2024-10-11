"use client";
import dynamic from "next/dynamic";
import { NextAuthProvider } from "@/lib/next-auth/provider";
import { useBgColor } from "@/hooks/useBgColor";
import { useState } from "react";

const Timer = dynamic(() => import("@/features/timer/Timer"), {
    ssr: false,
});

export default function Home() {
    const [timerMode, setTimerMode] = useState<string>("common");
    const handleClickChangeTimerMode = (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => {
        setTimerMode(e.currentTarget.id);
    };
    return (
        <NextAuthProvider>
            <main
                className={`relative w-screen h-screen mt-0 font-origin bg-original ${
                    timerMode == "common"
                        ? "bg-[#181818] duration-300"
                        : "bg-gray-800 duration-300"
                } text-white`}
            >
                <Timer
                    handleClickChangeTimerMode={(
                        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
                    ) => handleClickChangeTimerMode(e)}
                    timerMode={timerMode}
                />
            </main>
        </NextAuthProvider>
    );
}

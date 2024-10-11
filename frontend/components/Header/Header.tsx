// "use client";
import dynamic from "next/dynamic";
import React from "react";

const Clock = dynamic(() => import("@/features/clock/Clock"), {
    ssr: false,
});
// import Meeting from "@/features/meeting/Meeting";
// import Reading from "@/features/reading/Reading";

// import AuthView from "@/features/auth/AuthView";
const Meeting = dynamic(() => import("@/features/meeting/Meeting"));
const Reading = dynamic(() => import("@/features/reading/Reading"));
const AuthView = dynamic(() => import("@/features/auth/AuthView"));
import { NextAuthProvider } from "@/lib/next-auth/provider";

export default function Header() {
    return (
        <header className="w-screen top-0 absolute z-80 text-white">
            <div className="flex items-center justify-between py-5 md:w-[85%] w-[95%] m-auto border-b z-40 relative border-gray-700">
                <div className="flex items-center z-40">
                    <Clock />
                    <NextAuthProvider>
                        <AuthView />
                    </NextAuthProvider>
                </div>
                <nav>
                    <ul className="flex justify-between relative z-40">
                        <li className="ml-5">
                            <NextAuthProvider>
                                <Reading />
                            </NextAuthProvider>
                        </li>
                        <li className="ml-5">
                            <Meeting />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

import dynamic from "next/dynamic";
import React from "react";

const Clock = dynamic(() => import("@/features/clock/Clock"), {
    ssr: false,
});
import Meeting from "@/features/meeting/Meeting";
import Reading from "@/features/reading/Reading";
import MindMap from "@/features/mindmap/MindMap";

export default function Header() {
    return (
        <header className=" w-screen top-0">
            <div className="flex items-center justify-between p-5 w-[80%] m-auto border-b border-gray-800">
                <Clock />
                <nav>
                    <ul className="flex justify-between relative z-40">
                        <li className="ml-5">
                            <Reading />
                        </li>
                        <li className="ml-5">
                            <Meeting />
                        </li>
                        <li className="ml-5">
                            <MindMap />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

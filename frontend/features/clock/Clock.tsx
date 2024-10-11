"use client";
import React from "react";
import { useTime } from "./hooks/useTime";
import SandTime from "../sandtime/SandTime";

export default function Clock() {
    const time = useTime();
    return (
        <div className="flex items-center">
            <SandTime />
            <div className="md:ml-5 ml-0 h-fit">
                <p className="md:text-[12px] text-[9px]">
                    {time.toLocaleDateString()}
                </p>
                <p className="md:text-xl text-[12px]">
                    {time.toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}

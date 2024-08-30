"use client";
import React from "react";
import { useTime } from "./hooks/useTime";

export default function Clock() {
    const time = useTime();
    return (
        <div className="flex">
            <img src="./clock.svg" className="w-[40px]" />
            <div className="ml-2">
                <p className="text-[12px]">{time.toLocaleDateString()}</p>
                <p className="text-xl">{time.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

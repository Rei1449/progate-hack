"use client";
import React from "react";
import { useTime } from "./hooks/useTime";

export default function Clock() {
    const time = useTime();
    return (
        <div className="flex">
            <img src="./clock.svg" className="w-[50px]" />
            <div className="ml-2">
                <p className="text-md">{time.toLocaleDateString()}</p>
                <p className="text-2xl">{time.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

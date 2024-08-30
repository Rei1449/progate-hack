"use client";
import React from "react";
import { useTime } from "./hooks/useTime";

export default function Clock() {
    const time = useTime();
    return (
        <div className="flex">
            <img src="./clock.svg" className="md:block hidden w-[40px]" />
            <div className="md:ml-2 ml-0">
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

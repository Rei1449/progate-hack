"use client";

import { useState, useEffect, useRef } from "react";

export default function SandTime() {
    const [sand, setSand] = useState(100);
    // const [currentTime, setCurrentTime] = useState(new Date());
    const requestRef = useRef<number>();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // setCurrentTime(now);

            const startOfDay = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );
            const elapsedMs = now.getTime() - startOfDay.getTime();
            const totalMs = 24 * 60 * 60 * 1000;
            const newSand = 100 - (elapsedMs / totalMs) * 100;

            setSand(newSand);

            if (
                now.getHours() === 0 &&
                now.getMinutes() === 0 &&
                now.getSeconds() === 0
            ) {
                setSand(100);
            }

            requestRef.current = requestAnimationFrame(updateTime);
        };

        requestRef.current = requestAnimationFrame(updateTime);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    const fallingGrains = () => {
        if (sand <= 0) return null;

        const grains = [];
        const grainCount = 500;
        const centerX = 100;
        const width = 6;

        for (let i = 0; i < grainCount; i++) {
            const x = centerX + (Math.random() - 0.5) * width;
            const startY = 150 - 70 * (sand / 100) + Math.random() * 2;
            const duration = 0.8 + Math.random() * 0.4;
            grains.push(
                <circle
                    key={i}
                    cx={x}
                    cy={startY}
                    r="0.5"
                    fill="#5e5d63"
                    opacity={0.3 + Math.random() * 0.4}
                >
                    <animate
                        attributeName="cy"
                        from={startY}
                        to={290}
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                        begin={`${i * 0.002}s`}
                    />
                </circle>
            );
        }
        return grains;
    };

    return (
        <div className="h-fit bg-[#a4aeb5] p-1 rounded-[10px]">
            <svg width="30" height="40" viewBox="0 0 200 300" className="">
                <path
                    d="M20,10 L180,10 L100,150 L180,290 L20,290 L100,150 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />

                <clipPath id="upperSand">
                    <path d="M20,10 L180,10 L100,150 L100,150 Z" />
                </clipPath>
                <rect
                    x="20"
                    y={10 + 140 * (1 - sand / 100)}
                    width="160"
                    height={(140 * sand) / 100}
                    fill="#5e5d63"
                    clipPath="url(#upperSand)"
                />

                <clipPath id="lowerSand">
                    <path d="M100,150 L180,290 L20,290 L100,150 Z" />
                </clipPath>
                <path
                    d={`M20,290 L180,290 L100,${
                        290 - 140 * (1 - sand / 100)
                    } Z`}
                    fill="#5e5d63"
                    clipPath="url(#lowerSand)"
                />

                {fallingGrains()}
            </svg>
        </div>
    );
}

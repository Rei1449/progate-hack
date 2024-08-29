"use client";
import React from "react";
import { useTimer } from "./hooks/useTimer";
import TimerLog from "./components/TimerLog";
import TimerCategories from "./components/TimerCategories";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { TimerChart } from "./components/TimerChart";

export default function Timer() {
    const {
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        formatTime,
        seconds,
        isActive,
        isPaused,
    } = useTimer();
    return (
        <>
            <TimerCategories />
            <div className="absolute mt-10 w-[80%] m-auto right-0 left-0 flex justify-between items-start">
                <TimerLog />
                <div>
                    <p className="text-[250px]"> {formatTime(seconds)}</p>
                    <div className="flex justify-between border-t border-gray-800">
                        {!isActive && !isPaused && (
                            <button
                                onClick={startTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] w-[120px] p-5 mt-5"
                            >
                                Start
                            </button>
                        )}
                        {isActive && !isPaused && (
                            <button
                                onClick={pauseTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#181818] w-[120px] p-5 mt-5"
                            >
                                Pause
                            </button>
                        )}
                        {isPaused && (
                            <button
                                onClick={resumeTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] w-[120px] p-5 mt-5"
                            >
                                ReStart
                            </button>
                        )}
                        {isActive && (
                            <button
                                onClick={stopTimer}
                                className="hover:bg-[#08051d] hover:duration-300 rounded-md bg-[#0e0930] w-[120px] p-5 mt-5"
                            >
                                Done!!!
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Drawer>
                <DrawerTrigger className="bg-black py-[10px] fixed bottom-0 right-0 left-0">
                    「Qiita執筆」show log
                </DrawerTrigger>
                <DrawerContent>
                    <TimerChart />
                </DrawerContent>
            </Drawer>
        </>
    );
}

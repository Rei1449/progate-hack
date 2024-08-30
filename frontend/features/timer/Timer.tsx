"use client";
import React, { useState } from "react";
import { useTimer } from "./hooks/useTimer";
import TimerLog from "./components/TimerLog";
import TimerCategories from "./components/TimerCategories";

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { TimerChart } from "./components/TimerChart";
import TImercategoryForm from "./components/TImercategoryForm";

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
    const [viewCategory, setViewCategory] = useState("todo");
    const handleClickCategory = (category: string) => {
        setViewCategory(category);
        if (seconds > 0 && confirm("現在の作業を完了しますか？")) {
            stopTimer();
        }
    };
    return (
        <>
            <div className="flex flex-row-reverse flex-wrap justify-between items-center md:w-[85%] w-[90%] mt-2 m-auto">
                <TImercategoryForm />
                <TimerCategories handleClickCategory={handleClickCategory} />
            </div>
            <p className="text-2xl xl:text-6xl lg:text-4xl w-[85%] m-auto mt-10 ">
                {viewCategory}
            </p>
            <div className="absolute mt-5 w-[80%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
                <div className="md:w-[70%] w-full lg:ml-10 md:ml-5 ml-0">
                    <p className="md:mt-0 mt-[-20px] xl:text-[250px] lg:text-[200px] md:text-[140px] text-[100px] w-fit m-auto md:w-0 md:m-0 text-gray-300">
                        {formatTime(seconds)}
                    </p>
                    <div className="flex justify-between border-t border-gray-800">
                        {!isActive && !isPaused && (
                            <button
                                onClick={startTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Start
                            </button>
                        )}
                        {isActive && !isPaused && (
                            <button
                                onClick={pauseTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#181818] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Pause
                            </button>
                        )}
                        {isPaused && (
                            <button
                                onClick={resumeTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                ReStart
                            </button>
                        )}
                        {isActive && (
                            <button
                                onClick={stopTimer}
                                className="hover:bg-[#08051d] hover:duration-300 rounded-md bg-[#1a1157] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Done!!!
                            </button>
                        )}
                    </div>
                </div>
                <div className="md:w-[30%] w-full">
                    <TimerLog category={viewCategory} />
                </div>
            </div>
            <Drawer>
                <DrawerTrigger className="bg-black py-[12px] fixed bottom-0 right-0 left-0">
                    「Qiita執筆」記録を見る
                </DrawerTrigger>
                <DrawerContent className="bg-[#161616] border-none min-h-[400px]">
                    <DrawerTitle className="hidden ">記録</DrawerTitle>
                    <TimerChart />
                </DrawerContent>
            </Drawer>
        </>
    );
}

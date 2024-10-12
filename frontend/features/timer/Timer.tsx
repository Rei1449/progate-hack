"use client";
import React, { useEffect, useState } from "react";
import { useTimer } from "./hooks/useTimer";
import { TimerChart } from "./components/TimerChart";

import dynamic from "next/dynamic";

const TimerLog = dynamic(() => import("./components/TimerLog"));
const TimerCategories = dynamic(() => import("./components/TimerCategories"));
const TImerTagForm = dynamic(() => import("./components/TimerCategoryForm"));

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { useSession } from "next-auth/react";

import { DefaultSession } from "next-auth";
import TimerTodayCategories from "./components/TimerTodayCategories";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}
export type Tag = {
    user_id: string;
    id: number;
    title: string;
};

export type TodayData = {
    created_at: string;
    id: number;
    tag_id: number;
    time_second: number;
    user_id: string;
};

export default function Timer({
    handleClickChangeTimerMode,
    timerMode,
}: {
    handleClickChangeTimerMode: (
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
    ) => void;
    timerMode: string;
}) {
    const { data } = useSession();

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

    const [viewTag, setViewTag] = useState<Tag>();

    const [propTodayData, setPropTodayData] = useState<TodayData[]>([]);
    const selectTagTodaydata = (id: number) => {
        return todayData.filter((item) => item.tag_id === id);
    };

    const handleClickTag = (tag: Tag, id: number) => {
        if (seconds === 0) {
            setViewTag(tag);
            const data = selectTagTodaydata(id);
            setPropTodayData(data);
            setSendTag(tag);
        }
        if (seconds > 0) {
            if (confirm("現在の作業を完了しますか？")) {
                stopTimer();
                postTime();
            } else {
                return;
            }
        }
    };

    const [sendtag, setSendTag] = useState<Tag>();
    const [isLoading, setIsLoading] = useState(false);
    const postTime = async () => {
        setIsLoading(true);
        if (!data?.user.id) {
            return;
        }
        const sendData = {
            user_id: data?.user.id,
            time_second: seconds,
            tag_id: sendtag?.id,
        };
        const res = await fetch("https://geek-ten-backend-178548739799.asia-northeast1.run.app/time/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
        });
        if (res.ok) {
            const data = await res.json();
            const usedata: TodayData = data.text;
            console.log("res timer", usedata);

            setPropTodayData((prev) => {
                return [...prev, usedata];
            });
        }
        setIsLoading(false);
    };

    const [tags, setTags] = useState<Tag[]>([]);

    const getTags = async () => {
        if (!data?.user.id) {
            return;
        }
        const res = await fetch("https://geek-ten-backend-178548739799.asia-northeast1.run.app/tag", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: data?.user.id }),
        });
        if (res.ok) {
            const data = await res.json();
            const string = data.text;
            const parsedData = JSON.parse(string);
            setTags(parsedData);
        }
    };
    useEffect(() => {
        getTags();
        getTodayTime();
    }, [data?.user.id]);

    const [todayData, setTodayData] = useState<TodayData[]>([]);
    const getTodayTime = async () => {
        if (!data?.user.id) {
            return;
        }
        const res = await fetch(
            `https://geek-ten-backend-178548739799.asia-northeast1.run.app/time/today/${data?.user.id}`
        );
        if (res.ok) {
            const data = await res.json();
            setTodayData(data);
        }
    };

    return (
        <>
            <div className="flex justify-between flex-row-reverse flex-wrap items-center w-[90%] md:w-[85%] pt-[100px] mx-auto">
                <TImerTagForm setTags={setTags} />
                <div className="flex">
                    <div
                        onClick={(e) => handleClickChangeTimerMode(e)}
                        className="cursor-pointer"
                        id="common"
                    >
                        長期todo
                    </div>
                    <div
                        onClick={(e) => handleClickChangeTimerMode(e)}
                        className="cursor-pointer ml-5"
                        id="today"
                    >
                        今日のtodo
                    </div>
                </div>
            </div>
            {timerMode === "common" ? (
                <TimerCategories
                    handleClickCategory={handleClickTag}
                    tags={tags}
                    timerMode={timerMode}
                />
            ) : (
                <TimerTodayCategories
                    handleClickCategory={handleClickTag}
                    tags={tags}
                    timerMode={timerMode}
                />
            )}

            <div className="text-2xl xl:text-4xl lg:text-4xl w-[85%] m-auto mt-10 ">
                {viewTag === undefined ? (
                    <h1>Welcome to Time</h1>
                ) : (
                    <div className="flex items-center">
                        <p className="ml-5 text-gray-400">{viewTag?.title}</p>
                        {isLoading && <div className="loader-title ml-5"></div>}
                    </div>
                )}
            </div>
            <div className="absolute mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
                <div className="md:w-[68%] w-full lg:ml-10 md:ml-5 ml-0">
                    <p className="leading-tight md:mt-0 mt-[-20px] xl:text-[260px] lg:text-[200px] md:text-[140px] text-[100px]  m-auto h-fit md:w-0 md:m-0 text-gray-300">
                        {formatTime(seconds)}
                    </p>
                    <div className="flex justify-between border-t border-gray-800">
                        {!isActive && !isPaused && (
                            <button
                                onClick={() => {
                                    if (!viewTag) {
                                        alert("タスクを選択してください");
                                        return;
                                    }
                                    startTimer();
                                }}
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
                                onClick={() => {
                                    stopTimer();
                                    postTime();
                                }}
                                className="hover:bg-[#08051d] hover:duration-300 rounded-md bg-[#1a1157] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Done!!!
                            </button>
                        )}
                    </div>
                </div>
                <div className="md:w-[25%] w-full">
                    <TimerLog
                        propTodayData={propTodayData}
                        timerMode={timerMode}
                    />
                </div>
            </div>
            <Drawer>
                {viewTag !== undefined && (
                    <DrawerTrigger className="bg-[#0e0e0e] py-[12px] fixed bottom-0 right-0 left-0 w-[90%] rounded-md mx-auto ">
                        {viewTag?.title} 記録を見る
                    </DrawerTrigger>
                )}
                <DrawerContent className="bg-[#161616] border-none min-h-[400px]">
                    <DrawerTitle className="hidden ">記録</DrawerTitle>
                    <TimerChart tag={viewTag} />
                </DrawerContent>
            </Drawer>
        </>
    );
}

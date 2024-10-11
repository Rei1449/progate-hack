"use client";
import React from "react";
import { Tag } from "../Timer";

export default function TimerCategories({
    handleClickCategory,
    tags,
    timerMode,
}: {
    handleClickCategory: (category: Tag, id: number) => void;
    tags: Tag[] | undefined;
    timerMode: string;
}) {
    return (
        <div className="md:w-[85%] w-[92%] flex z-10 h-[32px] overflow-x-scroll md:mt-2 m-auto no-bar relative">
            <div
                className={`w-[40px] ${
                    timerMode === "common"
                        ? "bg-origin-shadow-right"
                        : "bg-origin-shadow-right-today"
                } h-[80px] mt-[-25px] fixed`}
            ></div>
            <div className={`w-[40px] z-60 h-[40px] absolute right-[-1px]`}>
                <div
                    className={`${
                        timerMode === "common"
                            ? "bg-origin-shadow-left"
                            : "bg-origin-shadow-left-today"
                    } fixed w-[40px] z-60 h-[70px] mt-[-18px]`}
                ></div>
            </div>
            {tags?.length === 0 ? (
                <p className="text-gray-300 ml-10">taskがありません</p>
            ) : (
                <>
                    {tags?.map((item: Tag) => (
                        <div
                            className="whitespace-nowrap bg-gray-700 py-1 px-5 rounded-md ml-[10px] cursor-pointer hover:duration-300 hover:bg-gray-600"
                            key={item.id}
                            onClick={() => handleClickCategory(item, item.id)}
                        >
                            {item.title}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

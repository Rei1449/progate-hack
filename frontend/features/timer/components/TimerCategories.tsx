"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Tag } from "../Timer";

export default function TimerCategories({
    handleClickCategory,
    tags,
}: {
    handleClickCategory: (category: Tag) => void;
    tags: Tag[];
}) {
    return (
        <div className="md:w-[75%] w-full flex z-10 overflow-x-scroll md:mt-0 mt-2 no-bar relative pr-5">
            <div className="w-[40px] bg-origin-shadow-right h-[40px] fixed"></div>
            <div className="w-[40px] z-60 h-[40px] absolute right-0">
                <div className="bg-origin-shadow-left fixed w-[40px] z-60 h-[40px]"></div>
            </div>
            {tags?.map((item: Tag) => (
                <div
                    className="whitespace-nowrap bg-gray-800 py-1 px-5 rounded-md ml-[10px] cursor-pointer hover:duration-300 hover:bg-gray-700"
                    key={item.id}
                    onClick={() => handleClickCategory(item)}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
}

import React from "react";
import { Tag } from "../Timer";

export default function TimerLog({ tag }: { tag: Tag | undefined }) {
    const dummuyData = [
        { date: "08/30", time: 2000 },
        { date: "08/30", time: 2500 },
        { date: "08/30", time: 2600 },
        { date: "08/30", time: 20 },
        { date: "08/30", time: 2900 },
        { date: "08/30", time: 200 },
        { date: "08/30", time: 300 },
    ];
    const formData = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };
    return (
        <div className="">
            <div className="md:mt-5 mt-2 w-[100%] bg-[#212121] lg:h-[400px] h-[150px] rounded-xl xl:p-10 p-5 overflow-y-scroll no-bar">
                {dummuyData.map(
                    (item: { date: string; time: number }, index: number) => (
                        <div
                            key={index}
                            className="flex md:mt-5 mt-2 border-b pb-1 border-gray-700"
                        >
                            <p className="lg:text-md text-xs">{item.date}</p>
                            <div className="ml-5 ">{formData(item.time)}</div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

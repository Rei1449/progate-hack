import React from "react";

export default function TimerLog({ category }: { category: string }) {
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
            <div className="mt-5 w-[100%] bg-[#212121] lg:h-[400px] h-[200px] rounded-xl xl:p-10 p-5 overflow-y-scroll no-bar">
                {dummuyData.map(
                    (item: { date: string; time: number }, index: number) => (
                        <div
                            key={index}
                            className="flex mt-5 border-b pb-1 border-gray-700"
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

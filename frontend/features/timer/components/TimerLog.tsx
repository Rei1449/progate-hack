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
        <div className="w-[27%] bg-[#212121] h-[450px] rounded-xl px-10 py-10 overflow-y-scroll">
            <p className="text-4xl">{category}</p>
            {dummuyData.map(
                (item: { date: string; time: number }, index: number) => (
                    <div
                        key={index}
                        className="flex mt-5 border-b pb-1 border-gray-600"
                    >
                        <p>{item.date}</p>
                        <div className="ml-5 text-2xl">
                            {formData(item.time)}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

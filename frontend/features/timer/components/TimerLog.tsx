import React from "react";
import { TodayData } from "../Timer";

type PropTodaydata = {
    time_second: number;
    created_at: string;
};

export default function TimerLog({
    propTodayData,
}: {
    propTodayData: TodayData[] | undefined;
}) {
    console.log("タグごとの今日のタイムデータ", propTodayData);
    const extractFields = (propTodayData: TodayData[] | undefined) => {
        return propTodayData?.map((item) => {
            const timePart = item.created_at.split("T")[1];
            let [hours, minutes] = timePart.split(":").map(Number);

            // 9時間を加算
            hours = (hours + 9) % 24;

            // 新しい時間を "HH:MM" の形式にフォーマット
            const hoursMinutes = `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}`;

            return {
                created_at: hoursMinutes,
                time_second: item.time_second,
            };
        });
    };
    const parsedData = extractFields(propTodayData);
    console.log("パースずみ", parsedData);

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
                <p>今日の記録</p>
                {parsedData?.map((item: PropTodaydata, index: number) => (
                    <div
                        key={index}
                        className="flex md:mt-5 mt-2 border-b pb-1 border-gray-700"
                    >
                        <p className="lg:text-md text-xs">{item.created_at}</p>
                        <div className="ml-5 ">
                            {formData(item.time_second)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React from "react";

export default function TimerCategories() {
    const dummuyCategory = [
        { category: "Qiita執筆" },
        { category: "WEB開発" },
        { category: "Qiita Listening" },
        { category: "Zenn Listening" },
        { category: "Udemy学習" },
    ];
    return (
        <div className="w-[80%] m-auto mt-10 flex z-10">
            {dummuyCategory.map((item: { category: string }) => (
                <div
                    className="bg-gray-800 py-1 px-5 rounded-md ml-[10px]"
                    key={item.category}
                >
                    {item.category}
                </div>
            ))}
        </div>
    );
}

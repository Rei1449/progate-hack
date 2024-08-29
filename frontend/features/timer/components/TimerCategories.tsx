import React from "react";

export default function TimerCategories({
    handleClickCategory,
}: {
    handleClickCategory: (category: string) => void;
}) {
    const dummuyCategory = [
        { category: "Qiita執筆" },
        { category: "WEB開発" },
        { category: "Qiita Listening" },
        { category: "Zenn Listening" },
        { category: "Udemy Laravel学習" },
        { category: "Udemy rails学習" },
    ];
    return (
        <div className="w-[75%] flex z-10 overflow-x-scroll">
            {dummuyCategory.map((item: { category: string }) => (
                <div
                    className="whitespace-nowrap bg-gray-800 py-1 px-5 rounded-md ml-[10px] cursor-pointer hover:duration-300 hover:bg-gray-700"
                    key={item.category}
                    onClick={() => handleClickCategory(item.category)}
                >
                    {item.category}
                </div>
            ))}
        </div>
    );
}

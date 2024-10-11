import React from "react";
import { Tag } from "../Timer";

export default function TimerTodayCategories({
    handleClickCategory,
    tags,
    timerMode,
}: {
    handleClickCategory: (category: Tag, id: number) => void;
    tags: Tag[] | undefined;
    timerMode: string;
}) {
    return <div></div>;
}

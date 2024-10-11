"use client";
import { useState } from "react";

export const useBgColor = () => {
    const [timerMode, setTimerMode] = useState<string>("common");

    return { timerMode, setTimerMode };
};

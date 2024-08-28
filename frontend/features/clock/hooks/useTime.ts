import { useEffect, useState } from "react";

export const useTime = () => {
    const [time, setTime] = useState(new Date());
    const culcTime = () => {
        setTime(new Date());
    };
    useEffect(() => {
        const intervalId = setInterval(culcTime, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return time;
};

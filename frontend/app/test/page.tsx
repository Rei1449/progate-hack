"use client";
import { useState, useEffect } from "react";

const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("id", intervalId);
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        // クリーンアップ関数でsetIntervalをクリア！
        //return () => clearInterval(intervalId);
    }, []);

    return <div>Count: {count}</div>;
};

export default Timer;

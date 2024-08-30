"use client";
import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export default function Reading() {
    const [sendUrl, setSendUrl] = useState<string>("");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendUrl(e.target.value);
    };
    const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sendData = {
            url: sendUrl,
            user_id: 1,
        };
        const res = await fetch("http://localhost:8080/qiita");

        if (res.ok) {
            const data = await res.json();
            console.log("res data", data);
        } else {
            console.log("fail");
        }
    };
    return (
        <Drawer>
            <DrawerTrigger className="md:ml-5 ml-2 flex items-center">
                <img src="./music.svg" className="w-[20px]" />
                <p className="md:block hidden ml-2">Article</p>
            </DrawerTrigger>
            <DrawerContent className="h-[80%] bg-[#1f1f1f] border-none md:px-10 px-2 py-1">
                <DrawerTitle className="font-bold text-2xl text-gray-300 mt-10 w-fit md:mx-0 mx-auto">
                    Article Listening
                </DrawerTitle>
                <form onSubmit={(e) => handleUrlSubmit(e)}>
                    <input
                        onChange={(e) => handleUrlChange(e)}
                        name="url"
                        placeholder="URLを入力してください"
                        className="border-b border-gray-500 bg-transparent px-5 py-5 w-full mt-2 outline-none focus:outline-none focus:duration-300"
                    />
                    <button className="w-[150px] m-auto block mt-5 border-green-800 text-gray-500 hover:duration-300 hover:text-white border px-5 py-2 rounded-md">
                        読み上げ！
                    </button>
                </form>
            </DrawerContent>
        </Drawer>
    );
}

"use client";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Tag } from "../Timer";
import { useRouter } from "next/navigation";

export default function TImercategoryForm({
    setTags,
}: {
    setTags: Dispatch<SetStateAction<Tag[]>>;
}) {
    const router = useRouter();
    const { data } = useSession();
    const [tag, setTag] = useState("");
    const postTag = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!data) {
            router.push("/login");
        }
        // if (!data?.user.id) {
        //     return;
        // }
        e.preventDefault();
        const userId = data?.user.id;
        console.log("userId", userId);

        const res = await fetch(
            "https://kzaecka7sp.us-west-2.awsapprunner.com/tag/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: tag, user_id: userId }),
            }
        );
        if (res.ok) {
            const data = await res.json();
            console.log("data?", data);
            setTag("");
            console.log("sendtext", data.text);
            setTags((prev) => {
                return [...prev, data.text];
            });
        }
    };
    const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };
    return (
        <form
            onSubmit={(e) => postTag(e)}
            className="md:w-[20%] w-[90%] m-auto relative md:mt-0"
        >
            <input
                value={tag}
                onChange={(e) => handleChangeTag(e)}
                type="text"
                name="category"
                placeholder="add task"
                className="w-[85%] border-b border-gray-800 bg-transparent px-1 py-2  mt-2 outline-none focus:outline-none focus:duration-300"
            />
            <button className="hover:duration-300 hover:bg-gray-600 absolute right-0 top-[10px] bg-gray-800 p-1 w-[32px] rounded-full">
                ＋
            </button>
        </form>
    );
}

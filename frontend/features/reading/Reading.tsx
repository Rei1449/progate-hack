"use client";
import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Article = {
    title: string;
    qiita_id: string;
};
export default function Reading() {
    const { data } = useSession();
    const [voiceURL, setVoiceURL] = useState<HTMLAudioElement | null>(null);
    const [sendUrl, setSendUrl] = useState<string>("");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        const parts = url.split("/");
        const id = parts[parts.length - 1];
        setSendUrl(id);
        console.log(id);
    };
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleArticleLisn = async (id: string) => {
        setIsLoading(true);
        if (!data) {
            router.push("/login");
        }
        const synthesis_response = await fetch(
            "https://kzaecka7sp.us-west-2.awsapprunner.com/qiita/tokio",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    qiita_id: id,
                    user_id: data?.user.id,
                }),
            }
        );

        const synthesis_response_buf = await synthesis_response.arrayBuffer();

        const blob = new Blob([synthesis_response_buf], { type: "audio/wav" });

        const url = URL.createObjectURL(blob);

        const audio = new Audio(url);
        setVoiceURL(audio);
        setIsLoading(false);
    };

    const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (!data) {
            router.push("/login");
        }
        const synthesis_response = await fetch(
            "https://kzaecka7sp.us-west-2.awsapprunner.com/qiita/tokio",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    qiita_id: sendUrl,
                    user_id: data?.user.id,
                }),
            }
        );

        const synthesis_response_buf = await synthesis_response.arrayBuffer();

        const blob = new Blob([synthesis_response_buf], { type: "audio/wav" });

        const url = URL.createObjectURL(blob);

        const audio = new Audio(url);
        setVoiceURL(audio);
        setIsLoading(false);
    };
    const handleClickURL = () => {
        setIsPaused(true);
        voiceURL?.play();
    };
    const [isPaused, setIsPaused] = useState(false);
    const handlePause = () => {
        setIsPaused(false);
        voiceURL?.pause();
    };
    const handleEnd = () => {
        voiceURL?.pause();
        setIsPaused(false);
        setVoiceURL(null);
    };
    const [articles, setArticles] = useState<Article[]>([]);
    const getArticle = async () => {
        if (!data?.user.id) {
            return;
        }
        const res = await fetch(`http://localhost:8080/qiita/${data?.user.id}`);
        if (res.ok) {
            const data = await res.json();
            console.log("data yo", data);
            setArticles(data.text);
        }
    };
    useEffect(() => {
        getArticle();
    }, [data?.user.id]);
    return (
        <Drawer>
            <DrawerTrigger className="md:ml-5 ml-2 flex items-center">
                <img src="./music.svg" className="w-[20px]" />
                <p className="md:block hidden ml-2">Article</p>
            </DrawerTrigger>
            <DrawerContent className="h-[60%] bg-[#1f1f1f] border-none md:px-10 px-2 py-1">
                <DrawerTitle className="font-bold text-2xl text-gray-300 mt-10 w-fit md:mx-0 mx-auto">
                    Article Listening
                    <br />
                    <span className="text-[12px]">VOICEVOX:ずんだもん</span>
                </DrawerTitle>
                <form onSubmit={(e) => handleUrlSubmit(e)}>
                    <input
                        onChange={(e) => handleUrlChange(e)}
                        name="url"
                        placeholder="URLを入力してください"
                        className="border-b border-gray-500 bg-transparent px-5 py-5 w-full mt-2 outline-none focus:outline-none focus:duration-300"
                    />
                    <button className="w-[150px] m-auto block mt-5 border-green-800 text-gray-500 hover:duration-300 hover:text-white border px-5 py-2 rounded-md">
                        選択
                    </button>
                </form>

                {voiceURL ? (
                    <>
                        <div className="flex justify-between md:w-[50%] w-[70%] mx-auto mt-5 bg-black p-1 rounded-md">
                            {isPaused ? (
                                <button
                                    onClick={handlePause}
                                    className="block px-5 py-1 bg-green-900 w-[49%]"
                                >
                                    一時停止
                                </button>
                            ) : (
                                <button
                                    onClick={handleClickURL}
                                    className="text-white block px-5 py-1 bg-green-900 w-[49%]"
                                >
                                    再生する
                                </button>
                            )}

                            <button
                                onClick={handleEnd}
                                className="block px-5 py-1 bg-[#141414] w-[49%]"
                            >
                                終了
                            </button>
                        </div>
                        <div
                            className={
                                isPaused ? "moving-line move" : "moving-line "
                            }
                        ></div>
                    </>
                ) : (
                    <>
                        {isLoading && (
                            <div className="text-[#077803] flex w-fit mx-auto items-center mt-5">
                                <div className="loader"></div>
                                <p className="ml-5">ロード中</p>
                            </div>
                        )}
                    </>
                )}
                <div className="mt-20">
                    <p className="text-[#077803] ml-1">過去に聞いた記事</p>
                    <div className="md:w-[70%] w-full mx-auto">
                        {articles.map((article: Article) => (
                            <div className="border-b border-[#077803] pb-2 mt-5">
                                <p className="">{article.title}</p>
                                <div
                                    className="text-[#077803] cursor-pointer"
                                    onClick={() =>
                                        handleArticleLisn(article.qiita_id)
                                    }
                                >
                                    もう一度聞く
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

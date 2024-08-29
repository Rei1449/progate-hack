import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Clock = dynamic(() => import("@/features/clock/Clock"), {
    ssr: false,
});
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function Header() {
    const roomIds = [1, 2, 3, 4, 5];
    return (
        <header className=" w-screen top-0">
            <div className="flex items-center justify-between p-10 w-[80%] m-auto border-b border-gray-800">
                <Clock />
                <nav>
                    <ul className="flex justify-between relative z-40">
                        <li className="ml-5">
                            <Drawer>
                                <DrawerTrigger className="ml-5 flex items-center">
                                    <img
                                        src="./music.svg"
                                        className="w-[20px]"
                                    />
                                    <p className="ml-2">Article</p>
                                </DrawerTrigger>
                                <DrawerContent className="min-h-[300px]">
                                    <form>
                                        <input />
                                    </form>
                                </DrawerContent>
                            </Drawer>
                        </li>
                        <li className="ml-5">
                            <Drawer>
                                <DrawerTrigger className="ml-5 flex items-center">
                                    <img
                                        src="./chat.svg"
                                        className="w-[20px]"
                                    />
                                    <p className="ml-2">Video</p>
                                </DrawerTrigger>
                                <DrawerContent className="min-h-[80%] bg-slate-700">
                                    <main className="p-10">
                                        <p className="font-bold">
                                            部屋を選択してください
                                        </p>
                                        {roomIds.map((id: number) => (
                                            <div key={id} className="mt-10">
                                                <Link href={`/room/${id}`}>
                                                    部屋{id}
                                                </Link>
                                            </div>
                                        ))}
                                    </main>
                                </DrawerContent>
                            </Drawer>
                        </li>
                        <li className="ml-5">
                            <Drawer>
                                <DrawerTrigger className="ml-5 flex items-center">
                                    <img
                                        src="./mind.svg"
                                        className="w-[20px]"
                                    />
                                    <p className="ml-2">MindMap</p>
                                </DrawerTrigger>
                                <DrawerContent className="min-h-[300px]">
                                    <form>
                                        <input />
                                    </form>
                                </DrawerContent>
                            </Drawer>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

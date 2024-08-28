import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Clock = dynamic(() => import("@/features/clock/Clock"), {
    ssr: false,
});
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function Header() {
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

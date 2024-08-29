import dynamic from "next/dynamic";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Clock = dynamic(() => import("@/features/clock/Clock"), {
    ssr: false,
});
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Meeting from "@/features/meeting/Meeting";
import Reading from "@/features/reading/Reading";

export default function Header() {
    const roomIds = ["hello", "hi", "hello world"];
    return (
        <header className=" w-screen top-0">
            <div className="flex items-center justify-between p-10 w-[80%] m-auto border-b border-gray-800">
                <Clock />
                <nav>
                    <ul className="flex justify-between relative z-40">
                        <li className="ml-5">
                            <Reading />
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
                                <DrawerContent className="h-[80%] overflow-scroll bg-[#1f1f1f] border-none p-10">
                                    <DrawerTitle className="font-bold text-2xl text-gray-300">
                                        Video Room
                                    </DrawerTitle>
                                    <form>
                                        <input
                                            placeholder="部屋名を入力してください"
                                            type="text"
                                            className="border-b border-gray-500 bg-transparent px-5 py-5 w-full mt-2 outline-none focus:outline-none focus:duration-300"
                                        />
                                        <button className="w-[150px] m-auto block mt-5 border-orange-800 text-gray-500 hover:duration-300 hover:text-white border px-5 py-2 rounded-md">
                                            作成する！
                                        </button>
                                    </form>
                                    <p className="w-[60%] m-auto mt-10 text-gray-400 mb-0">
                                        部屋一覧
                                    </p>
                                    {roomIds.map((id: string) => (
                                        <div
                                            key={id}
                                            className="m-auto mt-5 mb-0 border-b border-gray-700 w-[60%]"
                                        >
                                            <Dialog>
                                                <DialogTitle className="text-2xl">
                                                    {id}
                                                </DialogTitle>
                                                <DialogTrigger className="text-orange-700">
                                                    参加する→
                                                </DialogTrigger>
                                                <DialogContent className="bg-gray-900 border-none min-w-[100%] block p-10">
                                                    <DialogTitle>
                                                        {id}
                                                    </DialogTitle>

                                                    <Meeting roomId={id} />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))}
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
                                    <DrawerTitle className="ml-2">
                                        MindMap
                                    </DrawerTitle>
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

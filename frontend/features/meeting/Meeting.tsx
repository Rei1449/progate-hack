import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import MeetingVideo from "./components/MeetingVideo";

export default function Meeting() {
    const roomIds = ["hello", "hi", "hello world"];
    return (
        <Drawer>
            <DrawerTrigger className="ml-5 flex items-center">
                <img src="./chat.svg" className="w-[20px]" />
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
                            <DialogTitle className="text-2xl">{id}</DialogTitle>
                            <DialogTrigger className="text-orange-700">
                                参加する→
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-none min-w-[100%] block p-10">
                                <DialogTitle>{id}</DialogTitle>
                                <MeetingVideo roomId={id} />
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </DrawerContent>
        </Drawer>
    );
}

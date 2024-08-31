"use client";
import React, { useEffect, useState } from "react";
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

type BackRoom = {
    text: Room;
};

type Room = {
    id: number;
    name: string;
};
export default function Meeting() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const getRooms = async () => {
        const res = await fetch("http://localhost:8080/room/all");
        if (res.ok) {
            const data = await res.json();
            console.log("room", data);
            const string = data.text;
            const parsedData = JSON.parse(string);
            console.log(parsedData);
            setRooms(parsedData);
        }
    };
    useEffect(() => {
        getRooms();
    }, []);
    const [sendRoom, setSendRoom] = useState<string>("");
    const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendRoom(e.target.value);
    };
    const postRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/room/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: sendRoom }),
        });
        if (res.ok) {
            const data: BackRoom = await res.json();
            console.log("maked room", data);
            setSendRoom("");
            setRooms((prev) => {
                const updatedData = [data.text, ...prev];
                return updatedData;
            });
            console.log("Updated rooms:", rooms);
        }
    };
    return (
        <Drawer>
            <DrawerTrigger className="md:ml-5 ml-2 flex items-center">
                <img src="./chat.svg" className="w-[20px]" />
                <p className="ml-2 md:block hidden">Video</p>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80%] bg-[#1f1f1f] border-none md:px-10 px-2 py-1">
                <DrawerTitle className="font-bold text-2xl text-gray-300 mt-10 w-fit md:mx-0 mx-auto">
                    Video Room
                </DrawerTitle>
                <form onSubmit={(e) => postRoom(e)}>
                    <input
                        name="room"
                        value={sendRoom}
                        onChange={(e) => handleChangeRoom(e)}
                        placeholder="部屋名を入力してください"
                        type="text"
                        className="border-b border-gray-500 bg-transparent px-5 py-5 w-full mt-2 outline-none focus:outline-none focus:duration-300"
                    />
                    <button className="w-[150px] m-auto block mt-5 border-orange-800 text-gray-500 hover:duration-300 hover:text-white border px-5 py-2 rounded-md">
                        作成する！
                    </button>
                </form>
                <p className="md:w-[60%] w-[90%] m-auto mt-10 text-gray-400 mb-0">
                    部屋一覧
                </p>
                <div className="h-full overflow-scroll pb-10">
                    {rooms?.map((room: Room, index: number) => (
                        <div
                            key={`${room.name}${index}`}
                            className="m-auto mt-5 mb-0 border-b border-gray-700 md:w-[60%] w-[90%]"
                        >
                            <Dialog>
                                <DialogTitle className="text-2xl">
                                    {room.name}
                                </DialogTitle>
                                <DialogTrigger className="text-orange-700">
                                    参加する→
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-none min-w-[100%] block p-10">
                                    <DialogTitle>{room.name}</DialogTitle>
                                    <MeetingVideo roomId={room.id} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
}

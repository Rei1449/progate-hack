import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export default function MindMap() {
    return (
        <Drawer>
            <DrawerTrigger className="ml-5 flex items-center">
                <img src="./mind.svg" className="w-[20px]" />
                <p className=" ml-2 text-gray-300">MindMap</p>
            </DrawerTrigger>
            <DrawerContent className="min-h-[300px]">
                <DrawerTitle className="font-bold text-2xl ml-2 text-gray-300">
                    MindMap
                </DrawerTitle>
                <form>
                    <input />
                </form>
            </DrawerContent>
        </Drawer>
    );
}

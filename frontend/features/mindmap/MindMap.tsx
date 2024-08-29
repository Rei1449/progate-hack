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
                <DrawerTitle className="ml-2">MindMap</DrawerTitle>
            </DrawerTrigger>
            <DrawerContent className="min-h-[300px]">
                <form>
                    <input />
                </form>
            </DrawerContent>
        </Drawer>
    );
}

"use client";
import { NextAuthProvider } from "@/lib/next-auth/provider";
import FormButton from "./FormButton";

const page = () => {
    return (
        <NextAuthProvider>
            <div className="w-[85%] m-auto flex flex-row-reverse flex-wrap items-center justify-between mt-10">
                <FormButton />
                <div className="md:w-[48%]  w-full bg-gray-800 min-h-[600px] mt-10 md:mt-0">
                    <p className="lg:text-[200px] md:text-[120px] text-[100px] w-fit m-auto">
                        Time
                    </p>
                </div>
            </div>
        </NextAuthProvider>
    );
};

export default page;

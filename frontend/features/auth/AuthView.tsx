"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function AuthView() {
    const { data } = useSession();
    return (
        <div className="ml-5 border-l pl-5 flex items-center">
            {data && (
                <>
                    <img
                        src={`${data?.user?.image}`}
                        className="w-[20px] h-[20px] rounded-full"
                    />
                    <p className="ml-2 md:block hidden">{data?.user?.name}</p>
                </>
            )}
        </div>
    );
}

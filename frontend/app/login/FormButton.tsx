"use client";
import { signIn } from "next-auth/react";

const FormButton = () => {
    return (
        <div className="md:w-[48%] w-full">
            <div className="m-auto w-fit">
                <p className="text-[100px]">Login</p>
                <button
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="block bg-gray-200 w-[300px] text-black px-5 py-2 rounded-md border border-gray-400"
                >
                    <div className="w-fit m-auto flex items-center">
                        <img src="./github.svg" className="w-[30px]" />
                        <p className="ml-2">github</p>
                    </div>
                </button>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="mt-5 block bg-gray-200 w-[300px] text-black px-5 py-2 rounded-md border border-gray-400"
                >
                    <div className="w-fit m-auto flex items-center">
                        <img src="./google.svg" className="w-[28px]" />
                        <p className="ml-2">google</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FormButton;

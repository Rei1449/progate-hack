"use client";
import { NextAuthProvider } from "@/lib/next-auth/provider";
import FormButton from "./FormButton";

const page = () => {
    return (
        <NextAuthProvider>
            <div className="w-[85%] m-auto flex flex-row-reverse flex-wrap items-center justify-between mt-10">
                <FormButton />
                <div className="md:w-[48%]  w-full bg-[#232323] md:min-h-[600px] min-h-[450px] mt-10 md:mt-0">
                    <p className="lg:text-[180px] md:text-[120px] text-[100px] w-fit md:mt-5 m-auto">
                        Time
                    </p>
                    <div className="grid md:w-[70%] md:gap-10 mx-auto md:grid-cols-6 grid-cols-4 gap-5 w-[90%] ">
                        <img
                            src="./clock.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./chat.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./music.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./mind.svg"
                            className="md:w-[30px] w-[45px]"
                        />

                        <img
                            src="./clock.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./chat.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./music.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./mind.svg"
                            className="md:w-[30px] w-[45px]"
                        />

                        <img
                            src="./chat.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./music.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./mind.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                        <img
                            src="./music.svg"
                            className="md:w-[30px] w-[45px]"
                        />
                    </div>
                    <p className="w-fit mx-auto mt-20 text-xs">
                        timeは「VOICEVOX:ずんだもん」を利用しています
                        <br />
                    </p>
                </div>
            </div>
        </NextAuthProvider>
    );
};

export default page;

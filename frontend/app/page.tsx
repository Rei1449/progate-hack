import Meeting from "@/features/meeting/Meeting";
import Reading from "@/features/reading/Reading";
import dynamic from "next/dynamic";

const Timer = dynamic(() => import("@/features/timer/Timer"), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="relative w-screen max-h-screen">
            <Timer />
            <div className="">
                <Reading />
            </div>
            <p></p>
            {/* <div className="">
                <Meeting />
            </div> */}
        </main>
    );
}

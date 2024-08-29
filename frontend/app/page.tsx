import dynamic from "next/dynamic";

const Timer = dynamic(() => import("@/features/timer/Timer"), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="relative w-screen max-h-screen">
            <Timer />
        </main>
    );
}

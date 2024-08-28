import dynamic from "next/dynamic";
import Link from "next/link";
const Timer = dynamic(() => import("@/features/timer/Timer"), {
	ssr: false,
});
export default function Home() {
	return (
		<main className="bg-black min-h-screen">
			<div className="m-auto text-white text-6xl font-bold pt-10 w-fit">
				<Timer />
			</div>
			<Link href="/test" className="text-white">
				test test
			</Link>
		</main>
	);
}

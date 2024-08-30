import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
    title: "Top",
    description: "Topページ",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body className="w-screen max-h-screen font-origin bg-original bg-[#181818] text-white">
                <Header />
                {children}
            </body>
        </html>
    );
}

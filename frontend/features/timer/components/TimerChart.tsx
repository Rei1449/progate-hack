"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { Tag } from "../Timer";

export const description = "An interactive bar chart";

const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
];

const chartConfig = {
    views: {
        label: "min",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-2))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function TimerChart({ tag }: { tag: Tag | undefined }) {
    const [allSecond, setAllsecond] = React.useState<number>();

    const { data } = useSession();
    const [isLoading, setIsLoading] = React.useState(false);
    const getChartData = async () => {
        if (!data?.user.id) {
            return;
        }
        setIsLoading(true);
        const res = await fetch(
            `https://kzaecka7sp.us-west-2.awsapprunner.com/time/month/${tag?.id}/${data?.user.id}`
        );
        if (res.ok) {
            const data = await res.json();
            console.log("カテゴリごとのデータ", data);
            setAllsecond(data.allSeconds);
            // const transformedData = data.month.map((item: DateObj) => ({
            //     date: item.created_at.split("T")[0],
            //     desktop: 1,
            //     mobile: item.time_second * 150, // time_second を 150 倍する
            // }));
            const transformedData = Object.entries(data.month).map(
                ([key, value]) => ({
                    date: key,
                    desktop: 1,
                    mobile: value,
                })
            );
            console.log(transformedData);
            setDateObj(transformedData);
            console.log(dateObj);
            setIsLoading(false);
        }
    };
    type DateObj = {
        date: string;
        desktop: number;
        mobile: unknown;
    };
    const [dateObj, setDateObj] = React.useState<DateObj[]>();
    React.useEffect(() => {
        getChartData();
    }, []);
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("mobile");

    return (
        <Card className="bg-[#161616]  border-none">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row border-none">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 md:px-10 md:py-10 border-none">
                    <CardTitle className="text-gray-100">記録</CardTitle>
                    <CardDescription>1ヶ月間の記録</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 border-none min-h-[400px]">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-[90%] mx-auto  border-none"
                >
                    <BarChart
                        accessibilityLayer
                        data={dateObj}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                </ChartContainer>
                <div className="md:w-[80%] w-[90%] mx-auto text-white">
                    {isLoading && (
                        <div className="mt-10">
                            <div className="load-chart mx-auto"></div>
                        </div>
                    )}
                    <p className="text-right">
                        合計時間
                        <span className="text-[100px] ml-5 text-[#138f6c]">
                            {allSecond}s
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

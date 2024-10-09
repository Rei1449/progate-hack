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
            `http://localhost:8080/time/month/${tag?.id}/${data?.user.id}`
        );
        if (res.ok) {
            const data = await res.json();
            console.log("カテゴリごとのデータ", data);
            setAllsecond(data.allSeconds);
            const transformedData = Object.entries(data.month)
                .map(([key, value]) => ({
                    date: `2024-09-${key.padStart(2, "0")}`,
                    desktop: 1,
                    mobile: value,
                }))
                .slice(0, -1);
            console.log("transforn", transformedData);
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

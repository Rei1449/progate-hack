"use client";
import React from "react";
import { useTime } from "./hooks/useTime";

export default function Timer() {
	const time = useTime();
	return <div>{time.toLocaleTimeString()}</div>;
}

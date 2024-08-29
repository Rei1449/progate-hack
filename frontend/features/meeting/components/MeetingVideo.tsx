"use client";
import React, { useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";

export default function MeetingVideo({ roomId }: { roomId: string }) {
    const [videoCall, setVideoCall] = useState(true);
    const rtcProps = {
        appId: "96bea3218ec6414f9f20f70d3ff8bfd3",
        channel: roomId,
        token: null,
        layout: layout.grid,
    };
    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return (
        <div className="w-full mt-10 bg-gray-900">
            {videoCall ? (
                <div style={{ display: "flex", width: "100%", height: "80vh" }}>
                    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
                </div>
            ) : (
                <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
            )}
        </div>
    );
}

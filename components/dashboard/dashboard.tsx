import React from "react";
import ChatArea from "./chat-area";
// import ProjectsArea from "./history-area";

export default function Dashboard() {
  return (
    <>
      {/* Chat Area - Projects (History) Area*/}
      <div className="h-[calc(100vh-32px-48px)]">
        <ChatArea />
        {/* <ProjectsArea /> */}
      </div>
    </>
  );
}

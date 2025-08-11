import React from "react";
import { LuEllipsis } from "react-icons/lu";
import ProjectList from "./lists/history-lists";

export default function ProjectsArea() {
  return (
    <div className="border-l-[1.8px] dark:border-l-gray-800">
      {/* Header */}
      <div className="p-4 border-b-[1.8px] dark:border-b-gray-800 flex items-center justify-between">
        <div>
          <h1 className="font-medium">
            Projects <span className="text-neutral-400">(7)</span>
          </h1>
        </div>
        <div className="flex items-center hover:bg-neutral-200 rounded p-1">
          <button className="">
            <LuEllipsis />
          </button>
        </div>
      </div>
      {/* Projects List */}
      <div className="">
        <ProjectList />
      </div>
    </div>
  );
}

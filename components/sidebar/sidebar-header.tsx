"use client";
import Image from "next/image";
import React from "react";
import { LuPanelRight } from "react-icons/lu";

export default function SidebarHeader() {
  return (
    <div className="mb-4 px-2 ">
      <div className="flex relative gap-2 w-full items-center justify-between">
        <div className="flex items-center justify-between gap-4">
          <Image
            src="/logo.svg"
            alt="avatar"
            className="size-10 rounded shrink-0"
            width={40}
            height={40}
          />
          <div className="text-justify">
            <span className="block font-bold text-xl">Script</span>
          </div>
        </div>
        <button className="p-1.5 rounded hover:bg-stone-200 transition-colors">
          <LuPanelRight size={20.5} />
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { AiOutlineGift } from "react-icons/ai";
import { VscRobot } from "react-icons/vsc";

export default function Navbar() {
  return (
    <header className="px-4 py-4 flex items-center justify-between w-full">
      {/* Title */}
      <div className="">
        <h1 className="text-2xl font-bold">AI Chat</h1>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-5 justify-center">
        <span className="relative group cursor-pointer">
          <FaRegCircleQuestion size={24} />
          <span
            className="absolute -bottom-[180%] mb-2 left-1/2 -translate-x-1/2 
                     whitespace-nowrap rounded bg-gray-800 px-2 py-1 
                     text-xs text-white opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200"
          >
            Help
          </span>
        </span>

        <span className="relative group cursor-pointer">
          <AiOutlineGift size={24} />
          <span
            className="absolute -bottom-[180%] mb-2 left-1/2 -translate-x-1/2 
                     whitespace-nowrap rounded bg-gray-800 px-2 py-1 
                     text-xs text-white opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200"
          >
            Gift
          </span>
        </span>

        <span className="relative group cursor-pointer">
          <VscRobot size={24} />
          <span
            className="absolute -bottom-[180%] mb-2 left-1/2 -translate-x-1/2 
                     whitespace-nowrap rounded bg-gray-800 px-2 py-1 
                     text-xs text-white opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200"
          >
            AI
          </span>
        </span>
      </div>
    </header>
  );
}

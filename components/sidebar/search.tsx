"use client";
import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import CommandMenu from "./command-menu";

export default function Search() {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-2 ">
      <div className="bg-transparent mb-4 relative rounded-2xl border border-neutral-300 dark:border-gray-800 flex items-center p-1.5">
        <FiSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search"
          onFocus={(e) => {
            e.target.blur();
            setOpen(true);
          }}
          className="w-full bg-transparent placeholder:text-neutral-400 focus:outline-none"
        />
        <span className="text-xs p-1 flex gap-0.5 items-center shadow bg-neutral-50 dark:bg-neutral-600 rounded-full absolute right-1.5 top-1/2 -translate-y-1/2">
          <FiCommand />K
        </span>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
}

"use client";
import Image from "next/image";
import React from "react";

export default function UserAccount() {
  return (
    <div className="border-t p-2 border-t-stone-300 dark:border-t-gray-800">
      <div className="flex relative gap-2 w-full items-end">
        <Image
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-12 rounded-full shrink-0 shadow dark:border"
          width={48}
          height={48}
        />
        <div className="text-justify">
          <span className="text-sm block font-bold">John Doe</span>
          <span className="text-xs block text-stone-500">
            john@tenacity.dev
          </span>
        </div>
      </div>
    </div>
  );
}

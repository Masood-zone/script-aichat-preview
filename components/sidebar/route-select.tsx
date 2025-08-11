"use client";
import React from "react";
import { IconType } from "react-icons";
import { FiHome } from "react-icons/fi";
import { DiAptana } from "react-icons/di";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuPanelBottomOpen } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pages = [
  { Icon: FiHome, title: "AI Chat", active: true, path: "/" },
  {
    Icon: FaRegFolderClosed,
    title: "Projects",
    path: "/projects",
  },
  {
    Icon: LuPanelBottomOpen,
    title: "Templates",
    path: "/#",
  },
  {
    Icon: LuFileText,
    title: "Documents",
    path: "/documents",
  },
];

export default function RouteSelect() {
  return (
    <nav className="px-2 ">
      <div className="">
        {pages.map((page) => (
          <div key={page.title} className="my-2">
            <Route Icon={page.Icon} title={page.title} path={page.path} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <span className="block px-2  text-neutral-500 dark:text-neutral-300 font-medium">
          Settings & Help
        </span>
        <Route
          Icon={DiAptana}
          title="Settings"
          path="/settings"
          className="my-2"
        />
        <Route
          Icon={FaRegCircleQuestion}
          title="Help"
          path="/help"
          className="my-2"
        />
      </div>
    </nav>
  );
}

const Route = ({
  Icon,
  title,
  path,
  className = "",
}: {
  Icon: IconType;
  title: string;
  path: string;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link href={path}>
      <button
        className={`flex items-center gap-3 px-2 py-1.5 transition-[box-shadow,background-color,color] justify-start w-full rounded-2xl ${className}
    ${
      pathname === path
        ? "bg-white dark:gradient-border dark:bg-background dark:shadow dark:text-neutral-500 text-black shadow-md rounded-2xl"
        : "hover:bg-neutral-200 dark:hover:bg-neutral-600 bg-transparent hover:shadow-md"
    }
    text-neutral-500 font-medium shadow-none
    `}
      >
        <Icon
          className={`${
            pathname === path
              ? "text-primary fill-primary"
              : "dark:text-neutral-300"
          }`}
        />
        <span
          className={`${
            pathname === path
              ? "text-black dark:text-white"
              : "text-neutral-500 dark:text-neutral-300"
          }`}
        >
          {title}
        </span>
      </button>
    </Link>
  );
};

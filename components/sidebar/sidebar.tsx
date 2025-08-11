"use client";
import React from "react";
import Search from "./search";
import RouteSelect from "./route-select";
import SidebarHeader from "./sidebar-header";
import ThemeToggle from "../ui/theme-toggle";
import UserAccount from "./user-account";

export default function Sidebar() {
  return (
    <section className="border-r-[1.8px] dark:border-r-gray-800">
      <div className="sticky py-4 top-0 h-[calc(111vh-32px-48px)]">
        {/* Sidebar content */}
        <SidebarHeader />
        <Search />
        <RouteSelect />
        <div className="flex sticky top-[calc(100vh-48px-16px)] flex-col h-12 justify-end">
          <ThemeToggle />
          <UserAccount />
        </div>
      </div>
    </section>
  );
}

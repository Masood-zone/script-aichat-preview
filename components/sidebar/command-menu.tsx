"use client";
import { Command } from "cmdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { DiAptana } from "react-icons/di";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuPanelBottomOpen } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";

const CommandMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50 "
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-lg shadow-xl border-neutral-300 dark:border-none border overflow-hidden w-full max-w-lg mx-auto mt-12"
      >
        <Command.Input
          value={value}
          onValueChange={setValue}
          placeholder="What do you need?"
          className="relative border-b border-neutral-300 dark:bg-background dark:border-none p-3 text-lg w-full placeholder:text-neutral-400 focus:outline-none"
        />
        <Command.List className="p-3">
          <Command.Empty>
            No results found for{" "}
            <span className="text-primary-foreground">{value}</span>
          </Command.Empty>

          <Command.Group
            heading="General"
            className="text-sm mb-3 text-neutral-400"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-950 dark:text-neutral-300  dark:hover:text-neutral-600 hover:bg-neutral-200 rounded items-center gap-2">
              <FaRegFolderClosed />
              Projects
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-950 dark:text-neutral-300  dark:hover:text-neutral-600 hover:bg-neutral-200 rounded items-center gap-2">
              <LuPanelBottomOpen />
              Templates
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-950 dark:text-neutral-300  dark:hover:text-neutral-600 hover:bg-neutral-200 rounded items-center gap-2">
              <LuFileText />
              Documents
            </Command.Item>
          </Command.Group>
          <Command.Group
            heading="Settings & Help"
            className="text-sm mb-3 text-neutral-400"
          >
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-950 dark:text-neutral-300  dark:hover:text-neutral-600 hover:bg-neutral-200 rounded items-center gap-2">
              <DiAptana />
              Settings
            </Command.Item>
            <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-950 dark:text-neutral-300  dark:hover:text-neutral-600 hover:bg-neutral-200 rounded items-center gap-2">
              <FaRegCircleQuestion />
              Help
            </Command.Item>
          </Command.Group>

          <Command.Item className="flex cursor-pointer transition-colors p-2 text-sm text-neutral-50 bg-primary hover:bg-primary/60 rounded items-center gap-2">
            <FiLogOut />
            Sign Out
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandMenu;

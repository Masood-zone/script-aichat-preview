import React from "react";
import { IconType } from "react-icons";
import { CiCirclePlus } from "react-icons/ci";
import {
  FcGraduationCap,
  FcCalculator,
  FcRuler,
  FcGlobe,
} from "react-icons/fc";

const prompts = [
  {
    role: "user",
    prompt: "Physics basics in Ghanaian context",
    icon: FcGraduationCap,
  },
  { role: "user", prompt: "WASSCE physics questions", icon: FcCalculator },
  { role: "user", prompt: "Simple local physics experiments", icon: FcRuler },
  { role: "user", prompt: "Physics study paths in Ghana", icon: FcGlobe },
];

export default function DashboardWelcome({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <span className="text-6xl font-bold block tracking-wide">
          Welcome to Script
        </span>
        <span className="text-xl py-4 text-neutral-400">
          Get started by Script a task and Chat can do the rest. Not sure where
          to start?
        </span>
      </div>
      <div className="max-w-fit grid grid-cols-2 grid-rows-2 gap-4 items-center justify-center">
        {prompts.map(({ prompt, icon }, index) => (
          <PromptCard key={index} prompt={prompt} icon={icon} setInput={setInput} />
        ))}
      </div>
    </div>
  );
}

function PromptCard({
  prompt,
  icon: Icon,
  setInput,
}: {
  prompt: string;
  icon: IconType;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="col-span-1 border p-4 rounded-md flex gap-3 items-center justify-between">
      <div className="flex gap-2 items-center justify-center">
        <Icon className="" size={34} />
        <span>{prompt}</span>
      </div>
      <button
        className=""
        onClick={() => {
          setInput(prompt);
        }}
      >
        <CiCirclePlus size={28} />
      </button>
    </div>
  );
}

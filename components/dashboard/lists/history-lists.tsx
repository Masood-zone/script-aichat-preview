import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoIosRadioButtonOff } from "react-icons/io";
const projects_mock = [
  {
    id: 1,
    title: "Learning from 1000 years of content",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    completed: false,
  },
  {
    id: 2,
    title: "Exploring the depths of AI",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    completed: true,
  },
  {
    id: 3,
    title: "The future of technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    completed: false,
  },
];

export default function ProjectList() {
  return (
    <div className="py-2 px-4 flex flex-col items-center justify-center gap-4">
      {projects_mock.map((project) => (
        <ProjectListCard key={project.id} {...project} />
      ))}
    </div>
  );
}

function ProjectListCard({
  id,
  title,
  content,
  completed,
}: {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}) {
  return (
    <div
      key={id}
      className="max-w-lg flex items-center gap-2 rounded-lg text-wrap p-4 border border-gray-200 dark:border-gray-700"
    >
      {/* Project Title */}
      <div>
        <h1 className="font-semibold line-clamp-1">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
          {content}
        </p>
      </div>
      {/* Completed state */}
      <div className="">
        <span
          className={`inline-block  text-xs font-semibold rounded-full ${
            completed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {completed ? (
            <FiCheckCircle size={15} />
          ) : (
            <IoIosRadioButtonOff size={15} />
          )}
        </span>
      </div>
    </div>
  );
}

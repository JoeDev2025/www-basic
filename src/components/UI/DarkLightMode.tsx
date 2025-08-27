"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES =
	"text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-2 md:py-1.5 transition-colors relative z-10";
export const LS_KEY_DARK_MODE = "DarkLightMode";

const DarkLightMode = ({ minified }: { minified: boolean }) => {
	const [selectedTheme, setSelectedTheme] = useState("dark");

	useEffect(() => {
		// Get theme from localStorage only once on mount
		const savedTheme =
			(typeof localStorage !== "undefined" &&
				localStorage.getItem(LS_KEY_DARK_MODE)) ||
			"dark";
		setSelectedTheme(savedTheme);
	}, []);

	useEffect(() => {
		if (["dark", "light"].includes(selectedTheme)) {
			document.documentElement.classList.add(selectedTheme);
			localStorage.setItem(LS_KEY_DARK_MODE, selectedTheme);
			if (selectedTheme === "dark") {
				document.documentElement.classList.remove("light");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}
	}, [selectedTheme]);

	return (
		<div
			className={`rounded-md grid h-[42px] place-content-center px-4 transition-colors ${
				minified ? "" : selectedTheme === "light" ? "bg-white" : "bg-slate-900"
			}`}>
			<SliderToggle
				selected={selectedTheme}
				setSelected={setSelectedTheme}
				minified={minified}
			/>
		</div>
	);
};

const SliderToggle = ({
  selected,
  setSelected,
  minified,
}: {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  minified: boolean;
}) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
        }}>
        <FiSun className="relative z-10 text-lg md:text-sm" />
        {!minified && <span className="relative z-10">Light</span>}
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
        }}>
        <FiMoon className="relative z-10 text-lg md:text-sm" />

        {!minified && <span className="relative z-10">Dark</span>}
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}>
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600"
        />
      </div>
    </div>
  );
};

export default DarkLightMode;

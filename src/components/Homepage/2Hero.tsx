"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { GoArrowRight } from "react-icons/go";

export default function Hero() {
	return (
		<div className="max-w-4xl mx-auto mt-16 md:mt-32 text-center">
			<div className="flex flex-col gap-3 px-6 md:px-0">
				<motion.h1
					className="font-extralight text-4xl md:text-[5.5rem] md:leading-[5rem] tracking-tight text-gray-900 dark:text-white"
					initial={{ y: "100px", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6 }}>
					Customer{" "}
					<span className="font-medium text-[#5364e0]">Website</span>
				</motion.h1>
				<motion.p
					className="text-xl md:leading-relaxed max-w-2xl mx-auto text-gray-700 dark:text-white"
					initial={{ x: "50px", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.9, delay: 0.3 }}>
					This will be your customer facing website using the www. subdomain! Here is the website that our customers will be using to access your products and services.
				</motion.p>
				<motion.div
					className="mt-5 mx-auto flex justify-center items-center gap-3"
					initial={{ x: "-50px", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}>
					<Link href="/about"
						aria-label="Start your free trial"
						className="flex gap-4 items-center text-gray-900 dark:text-white font-bold hover:text-gray-600 dark:hover:text-gray-400 transition-colors ease-in-out duration-300 group">
						<GoArrowRight className="text-2xl text-[#5364e0] group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
						<span>Test config & vars</span>
					</Link>
				</motion.div>
			</div>
		</div>
	);
}

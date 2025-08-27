"use client"

import Hero from "@/components/Homepage/2Hero";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { ComponentProtected } from "../UI/Auth/PageProtected";
import { LoaderSmall } from "../UI/Loaders";

export default function HomePage() {
	return (
		<div>
			{/* 1 Header and Menu */}

			{/* 2 Hero */}
			<Hero />

			<div className="flex justify-center items-center gap-6 my-32">
				<ComponentProtected
					signedInChildren={
						<div className="text-green-500 flex items-center gap-2">
							<FiLogIn className="text-2xl" />
							<span>You are Signed In</span>
						</div>
					}
					loggedOutChildren={
						<div className="text-orange-500 flex items-center gap-2">
							<FiLogOut className="text-2xl" />
							<span>You are Logged Out</span>
						</div>
					}
					showLoadingElement={
						<div className="text-gray-500 flex items-center gap-2">
							<LoaderSmall />
							<span>Checking login status...</span>
						</div>
					}
				/>
			</div>

			<motion.div
				className="flex justify-center items-center gap-6 my-32"
				initial={{ y: "500px", opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 1.2 }}>
				<Image
					src="/main-logo-dark-lg.png"
					alt="logo"
					className="w-full mt-3 -mb-5 hidden dark:block"
					width={960}
					height={96}
				/>
				<Image
					src="/main-logo-light-lg.png"
					alt="logo"
					className="w-full mt-3 -mb-5 block dark:hidden"
					width={960}
					height={96}
				/>
			</motion.div>

			{/* <AuthExamples /> */}
		</div>
	);
}

"use client"

import Hero from "@/components/Homepage/2Hero";
import { motion } from "framer-motion";
import Image from "next/image";



export default function HomePage() {

	return (
		<div>
			{/* 1 Header and Menu */}

			{/* 2 Hero */}
			<Hero />

			<motion.div
					className="flex justify-center items-center gap-6 my-32"
					initial={{ y: "500px", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 1.2 }} >
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

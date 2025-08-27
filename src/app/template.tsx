"use client";

import { AuthModalProvider } from "@/components/UI/Auth/AuthModalProvider";

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		// <AuthModalProvider>
		//   <motion.div
		//     initial={{ x: "100vw", opacity: 0 }} // Start off-screen to the right
		//     animate={{ x: 0, opacity: 1 }} // Animate to the center
		//     exit={{ x: "-100vw", opacity: 0 }} // Exit off-screen to the left
		//     transition={{ ease: "easeInOut", duration: 0.75 }}>
		//     {children}
		//   </motion.div>
		// </AuthModalProvider>
		<AuthModalProvider>
			{children}
			{/* <p className="text-yellow-300">YELLOW</p> */}
		</AuthModalProvider>
	);
}

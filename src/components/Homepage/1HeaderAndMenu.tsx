"use client";

import { mainMenu } from "@/app/menu";
import { supabaseCLIENT } from "@/lib/supabaseClient";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuthModal } from "../UI/Auth/AuthModalProvider";
import DarkLightMode from "../UI/DarkLightMode";

export default function HeaderAndMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMoreOpen, setIsMoreOpen] = useState(false);
	const { openAuthModal, authState, refreshAuthState } = useAuthModal();

	// Split menu items into main and dropdown
	const mainItems = mainMenu.slice(0, 4);
	const dropdownItems = mainMenu.slice(4);

	const handleLogout = async () => {
		try {
			const { error } = await supabaseCLIENT.auth.signOut();
			if (error) {
				console.error("Error signing out:", error.message);
			} else {
				// Refresh the auth state to update the UI
				await refreshAuthState();
			}
		} catch (error) {
			console.error("Unexpected error during logout:", error);
		}
	};

	return (
		<header className="fixed top-0 left-0 right-0 py-2 px-6 xl:px-0 border-b border-white/5 bg-zinc-100/80 dark:bg-[#0d0d12]/80 backdrop-blur-sm z-50 transition-all duration-300">
			<nav className="flex justify-between items-center gap-6 max-w-6xl mx-auto">
				{/* Logo */}
				<Image
					src="/main-logo-dark-lg.png"
					alt="logo"
					className="w-48 mt-3 -mb-5 hidden dark:block"
					width={240}
					height={24}
				/>
				<Image
					src="/main-logo-light-lg.png"
					alt="logo"
					className="w-48 mt-3 -mb-5 block dark:hidden"
					width={240}
					height={24}
				/>

				{/* Desktop Menu */}
				<ul className={`hidden md:flex space-x-10 text-base`}>
					{mainItems.map((item, index) => (
						<li
							key={index}
							className="text-gray-900 dark:text-gray-100 font-light hover:text-gray-200 transition-colors ease-in-out duration-300">
							<Link href={item.href}>{item.name}</Link>
						</li>
					))}
					{/* More Dropdown */}
					{dropdownItems.length > 0 && (
						<li
							className="relative"
							onMouseEnter={() => setIsMoreOpen(true)}
							onMouseLeave={() => setIsMoreOpen(false)}>
							<button className="text-gray-400 font-light hover:text-gray-200 transition-colors ease-in-out duration-300">
								More
							</button>
							<AnimatePresence>
								{isMoreOpen && (
									<motion.ul
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										transition={{ duration: 0.2 }}
										className="absolute top-[37px] left-0 border border-t-0 border-white/10 bg-[#0d0d12]/80 backdrop-blur-sm p-4 rounded-lg shadow-lg min-w-[200px]">
										{dropdownItems.map((item, index) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												className="mb-2 last:mb-0">
												<Link
													href={item.href}
													className="block text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
													{item.name}
												</Link>
											</motion.li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</li>
					)}
				</ul>

				{/* Action Buttons (desktop only) */}
				<div className={`space-x-8 hidden lg:flex`}>
					<DarkLightMode minified={true} />

					{/* Show login/register buttons when not logged in */}
					{!authState.loggedIn && (
						<>
							<button
								aria-label="Login"
								type="button"
								onClick={() => openAuthModal("signin")}
								className="text-gray-800 dark:text-gray-400  hover:text-gray-900 dark:hover:text-gray-200 transition-colors ease-in-out duration-300 flex justify-center items-center gap-2 group">
								<span>Login</span>
								<FiLogIn className="text-2xl group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
							</button>
							<button
								aria-label="Register"
								type="button"
								onClick={() => openAuthModal("register")}
								className="test-bubble-1 text-sm px-4 py-1 rounded-3xl  flex justify-center items-center gap-2 hover:scale-[110%] transition-transform ease-in-out duration-300 bg-[#415cf4] text-white">
								<FiUserPlus className="text-lg" />
								<span>Register</span>
							</button>
						</>
					)}

					{/* Show logout button when logged in */}
					{authState.loggedIn && (
						<button
							aria-label="Logout"
							type="button"
							onClick={handleLogout}
							className="text-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ease-in-out duration-300 flex justify-center items-center gap-2 group">
							<span>Logout</span>
							<FiLogIn className="text-2xl group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
						</button>
					)}
				</div>

				{/* Hamburger Icon (mobile/tablet only) */}
				<button
					className={`flex lg:hidden text-white text-2xl`}
					onClick={() => setIsOpen((prev) => !prev)}>
					<RxHamburgerMenu />
				</button>
			</nav>

			{/* Dropdown Menu (mobile/tablet) */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="lg:hidden  text-white px-6 pt-4 pb-6 space-y-4">
						<div className="grid grid-cols-3 gap-4">
							{mainMenu.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.4 }}>
									<Link
										href={item.href}
										className="block text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
										{item.name}
									</Link>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: mainMenu.length * 0.1 + 0.2, duration: 0.4 }}
							className="flex justify-center mt-6 gap-3">
							{/* Show login/register buttons when not logged in */}
							{!authState.loggedIn && (
								<>
									<button
										aria-label="Login"
										type="button"
										onClick={() => openAuthModal("signin")}
										className="text-gray-800 dark:text-gray-400  hover:text-gray-900 dark:hover:text-gray-200 transition-colors ease-in-out duration-300 flex justify-center items-center gap-2 group">
										<span>Login</span>
										<FiLogIn className="text-2xl group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
									</button>
									<button
										aria-label="Register"
										type="button"
										onClick={() => openAuthModal("register")}
										className="test-bubble-1 text-sm px-4 py-1 rounded-3xl  flex justify-center items-center gap-2 hover:scale-[110%] transition-transform ease-in-out duration-300 bg-[#415cf4] text-white">
										<FiUserPlus className="text-lg" />
										<span>Register</span>
									</button>
								</>
							)}

							{/* Show logout button when logged in */}
							{authState.loggedIn && (
								<button
									aria-label="Logout"
									type="button"
									onClick={handleLogout}
									className="text-gray-800 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ease-in-out duration-300 flex justify-center items-center gap-2 group">
									<span>Logout</span>
									<FiLogIn className="text-2xl group-hover:translate-x-1 transition-transform ease-in-out duration-300" />
								</button>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

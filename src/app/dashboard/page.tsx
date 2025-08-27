"use client";

import { useAuthModal } from "@/components/UI/Auth/AuthModalProvider";
import { GleamButton } from "@/components/UI/Buttons/GleamButton";
import { supabaseCLIENT } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function Dashboard() {
	const router = useRouter();
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const { openAuthModal } = useAuthModal();

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { session },
			} = await supabaseCLIENT.auth.getSession();

			if (session?.user) {
				setUserEmail(session.user.email ?? null);
			} else {
				setUserEmail(null);
			}
			setLoading(false);
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await supabaseCLIENT.auth.signOut();
		router.replace("/?logout=true"); // Redirect to homepage after logout
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen text-lg">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen text-center px-6">
			{userEmail ? (
				<div>
					<h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
					<p className="text-gray-600 mt-2">
						You are logged in as:{" "}
						<span className="font-medium">{userEmail}</span>
					</p>
					<button
						onClick={handleLogout}
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
						Logout
					</button>
				</div>
			) : (
				<div>
					<h1 className="text-2xl font-semibold">Not Logged In</h1>
					<p className="text-gray-600 mt-2">
						Please sign in to access the dashboard.
					</p>
					<div className="flex justify-center mt-4">
						<GleamButton
							onClick={() => openAuthModal("signin")}
							icon={<FiLogIn />}>
							Sign In
						</GleamButton>
					</div>
				</div>
			)}
		</div>
	);
}

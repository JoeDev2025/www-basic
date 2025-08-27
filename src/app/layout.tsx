import HeaderAndMenu from "@/components/Homepage/1HeaderAndMenu";
import { FontMontserrat } from "@/components/UI/Fonts";
import Footer from "@/components/UI/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Customer Website",
	description:
		"A simple, clean, and responsive blog template for Next.js with Tailwind CSS and TypeScript.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={`antialiased  bg-white dark:bg-zinc-950/95 text-black dark:text-white`}>
				<FontMontserrat>
					<div>


						{/* NEW MENU */}
						<HeaderAndMenu />
					</div>
					<div className="mt-20">{children}</div>
					<Footer />
				</FontMontserrat>
			</body>
		</html>
	);
}

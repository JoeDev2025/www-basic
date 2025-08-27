import BlankComponent from "@/components/Blank/Blank";
import { generateMetadata } from "@/components/UI/MetaHeaders";

export const metadata = generateMetadata({
	title: "Blank Page",
	description: "Just a blank page ready for you to start editing...",
	// image: "/dark-maake_it-robot.webp", // Optional
});

export default function BlankPage() {
	const header = "Just a Blank Page...";
	const description = `I'm just a blank page ready for you to start editing... add whatever you like to me!`;
	return (
		<div className="mt-6 mx-auto max-w-7xl">
			<h1 className="text-3xl font-bold mb-3">{header}</h1>
			<div className="flex flex-col gap-3 text-gray-500">
				<p>{description}</p>
			</div>
			<div className="flex flex-col gap-3 my-6">
				<BlankComponent />
			</div>
		</div>
	);
}

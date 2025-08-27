import { Metadata } from "next";

interface MetaHeadersProps {
	title: string;
	description: string;
	image?: string;
	noIndex?: boolean;
}

export function generateMetadata({
	title,
	description,
	image,
	noIndex = false,
}: MetaHeadersProps): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			...(image && { images: [{ url: image }] }),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			...(image && { images: [image] }),
		},
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}

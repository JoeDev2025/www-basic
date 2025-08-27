import { Montserrat, Unbounded } from "next/font/google";

type FontProps = {
	children: React.ReactNode | string;
};

const unbounded = Unbounded({
	variable: "--font-syne",
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin", "cyrillic"],
});
// Do not export this component as NextJS will throw an error when building
export const FontUnbounded = ({ children }: FontProps) => (
	<span className={` ${unbounded.className} `}>{children}</span>
);

const montserrat = Montserrat({
	variable: "--font-main",
	weight: ["400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["system-ui", "arial", "sans-serif"],
	style: ["normal", "italic"],
});
// Do not export this component as NextJS will throw an error when building
export const FontMontserrat = ({ children }: FontProps) => (
	<span className={` ${montserrat.className} `}>{children}</span>
);

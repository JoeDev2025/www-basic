import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project credentials
export const supabasePUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabaseCLIENT = createClient(
	supabasePUBLIC_URL,
	supabaseANON_KEY
);

export const supabaseSTORAGE_PATH = "/storage/v1/object/public/"; // This is generally the same, but left it here in case it changes

export const fetchSBAuthToken = () => {
	if (typeof window === "undefined") return false;
	const token = localStorage.getItem("sb-ksxxirshjgoonozkkvqg-auth-token");
	if (!token) return false;
	const parsedToken = JSON.parse(token!).access_token;
	return parsedToken;
};

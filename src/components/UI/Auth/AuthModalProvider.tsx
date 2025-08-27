import { supabaseCLIENT } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthFormType } from "./AuthModal";
import AuthModalLoader from "./AuthModalLoader"; // Import the lazy-loaded modal

export type AuthState =
	| {
			pending: true;
			loggedIn: false;
			loggedOut: false;
			user: null;
	  }
	| {
			pending: false;
			loggedIn: true;
			loggedOut: false;
			user: User;
	  }
	| {
			pending: false;
			loggedIn: false;
			loggedOut: true;
			user: null;
	  };

// Context for controlling the AuthModal
const ModalContext = createContext<{
	openAuthModal: (type: AuthFormType) => void;
	closeAuthModal: () => void;
	authState: AuthState;
	refreshAuthState: () => void;
}>({
	openAuthModal: () => {},
	closeAuthModal: () => {},
	authState: {
		pending: true,
		loggedIn: false,
		loggedOut: false,
		user: null,
	},
	refreshAuthState: () => {},
});

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [authType, setAuthType] = useState<AuthFormType>("signin");
	const [authState, setAuthState] = useState<AuthState>({
		pending: true,
		loggedIn: false,
		loggedOut: false,
		user: null,
	});

	const openAuthModal = useCallback((type: AuthFormType) => {
		console.log("openAuthModal", type);
		setAuthType(type);
		setIsOpen(true);
	}, []);

	const closeAuthModal = useCallback(() => setIsOpen(false), []);

	const refreshAuthState = async () => {
		try {
			const { data, error } = await supabaseCLIENT.auth.getSession();
			if (error) {
				throw error;
			}
			if (data.session) {
				const user = data.session.user;
				setAuthState({
					pending: false,
					loggedIn: true,
					loggedOut: false,
					user: user,
				});
			} else {
				// No session means user is logged out
				setAuthState({
					pending: false,
					loggedIn: false,
					loggedOut: true,
					user: null,
				});
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Error getting session:", error.message);
			} else {
				console.error("Error getting session:", error);
			}
			setAuthState({
				pending: false,
				loggedIn: false,
				loggedOut: true,
				user: null,
			});
		}
	};

	useEffect(() => {
		// Initial auth state check
		refreshAuthState();

		// Listen for auth state changes
		const {
			data: { subscription },
		} = supabaseCLIENT.auth.onAuthStateChange(async (event, session) => {
			console.log("Auth state change:", event, session);
			if (event === "SIGNED_IN" && session) {
				setAuthState({
					pending: false,
					loggedIn: true,
					loggedOut: false,
					user: session.user,
				});
			} else if (event === "SIGNED_OUT") {
				setAuthState({
					pending: false,
					loggedIn: false,
					loggedOut: true,
					user: null,
				});
			}
		});

		// Cleanup subscription
		return () => subscription.unsubscribe();
	}, []);

	return (
		<ModalContext.Provider
			value={{ openAuthModal, closeAuthModal, authState, refreshAuthState }}>
			{children}
			<AuthModalLoader isOpen={isOpen} setIsOpen={setIsOpen} type={authType} />
		</ModalContext.Provider>
	);
};

// Hook to access modal control
export const useAuthModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

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
			await supabaseCLIENT.auth.refreshSession();
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
				throw new Error("No session data");
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
		refreshAuthState();
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

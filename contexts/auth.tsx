import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
	isAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	useEffect(() => {
		const loadAuthState = async () => {
			try {
				const token = await SecureStore.getItemAsync("access_token");
				setIsAuth(!!token);
			} catch (error) {
				console.error('Failed to load auth state:', error);
			}
		};

		loadAuthState();
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

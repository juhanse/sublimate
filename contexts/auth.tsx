import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
	isAuth: boolean;
	isOnboarded: boolean;
	setOnboarded: (value: boolean) => void;
	login: (token: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

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

	const setOnboarded = (value: boolean) => {
		setIsOnboarded(value);
	}

	const login = async (newToken: string) => {
		await SecureStore.setItemAsync('access_token', newToken);
		setIsAuth(true);
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync('access_token');
		setIsAuth(false);
	};

	return (
		<AuthContext.Provider value={{ isAuth, isOnboarded, setOnboarded, login, logout }}>
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

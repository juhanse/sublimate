import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
	token: string | null;
	login: (token: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const loadToken = async () => {
			const storedToken = await SecureStore.getItemAsync('access_token');
			if (storedToken) setToken(storedToken);
		};
		loadToken();
	}, []);

	const login = async (newToken: string) => {
		setToken(newToken);
		await SecureStore.setItemAsync('access_token', newToken);
	};

	const logout = async () => {
		setToken(null);
		await SecureStore.deleteItemAsync('access_token');
	};

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

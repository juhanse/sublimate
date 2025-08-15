import React, { useEffect, createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
	id: string;
	username: string;
	avatar?: string;
	xp?: number;
}

interface UserContextType {
	user: User | undefined;
	setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUserState] = useState<User | undefined>();

	useEffect(() => {
		const loadUser = async () => {
			const savedUser = await SecureStore.getItemAsync("user");
			if (savedUser) {
				setUserState(JSON.parse(savedUser));
			}
		};
		loadUser();
	}, []);

	const setUser = (user: User) => {
		setUserState(user);
		console.log("User saved:", user);
		SecureStore.setItemAsync("user", JSON.stringify(user));
	};

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const ctx = useContext(UserContext);
	if (!ctx) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return ctx;
};

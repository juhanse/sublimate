import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingContextType {
	seenOnboarding: boolean;
	markOnboardingSeen: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
	const [seenOnboarding, setSeenOnboarding] = useState(false);
	const STORAGE_KEY = "seen_onboarding";

	useEffect(() => {
		AsyncStorage.getItem(STORAGE_KEY).then(value => {
			setSeenOnboarding(value === "true");
		});
	}, []);

	const markOnboardingSeen = async () => {
		await AsyncStorage.setItem(STORAGE_KEY, "true");
		setSeenOnboarding(true);
	};

	return (
		<OnboardingContext.Provider value={{ seenOnboarding, markOnboardingSeen }}>
			{children}
		</OnboardingContext.Provider>
	);
};

export const useOnboarding = () => {
	const context = useContext(OnboardingContext);
	if (!context) {
		throw new Error("useOnboarding must be used within OnboardingProvider");
	}
	return context;
};

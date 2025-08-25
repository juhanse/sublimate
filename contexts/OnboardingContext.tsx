import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingProps {
	seenOnboarding: boolean;
	markOnboardingSeen: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingProps>()(
	persist(
		(set) => ({
			seenOnboarding: false,
			markOnboardingSeen: async () => {
				set({ seenOnboarding: true });
			},
		}),
		{
			name: 'seen_onboarding', // la clé dans AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

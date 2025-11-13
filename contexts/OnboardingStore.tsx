import { create } from 'zustand';

type OnboardingState = {
	step: number;
	setStep: (step: number) => void;
	nextStep: () => void;
	previousStep: () => void;
	reset: () => void;
	seenOnboarding: boolean;
	setSeenOnboarding: (seen: boolean) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
	step: 1,
	setStep: (step) => set({ step }),
	nextStep: () => set((state) => ({ step: state.step + 1 })),
	previousStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
	reset: () => set({ step: 1 }),
	seenOnboarding: false,
	setSeenOnboarding: (seen) => set({ seenOnboarding: seen }),
}));

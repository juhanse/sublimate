import { create } from "zustand";
import { persist } from "zustand/middleware";
import { updateMe } from "@/services/usersQueries";

type OnboardingState = {
	step: 1 | 2 | 3 | 4 | 5;
	setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
	next: () => void;
	prev: () => void;
	completed: boolean;
	finish: () => void;
	syncFromBackend: (step: number, completed: boolean) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set, get) => ({
			step: 1,
			completed: false,
			setStep: async (step) => {
				set({ step, completed: step > 5 });
				if (step <= 5) {
					await updateMe({ onboarding: step });
				}
			},
			next: async () => {
				const nextStep = Math.min(5, get().step + 1) as 1 | 2 | 3 | 4 | 5;
				set({ step: nextStep, completed: nextStep > 5 });
				if (nextStep <= 5) await updateMe({ onboarding: nextStep });
			},
			prev: async () => {
				const prevStep = Math.max(1, get().step - 1) as 1 | 2 | 3 | 4 | 5;
				set({ step: prevStep });
				await updateMe({ onboarding: prevStep });
			},
			finish: async () => {
				set({ completed: true, step: 5 });
				await updateMe({ onboarding: 5 });
			},
			syncFromBackend: (step, completed) => set({ step: (completed ? 5 : Math.min(5, Math.max(1, step))) as 1 | 2 | 3 | 4 | 5, completed }),
		}),
		{
			name: "onboarding-storage",
		}
	)
);

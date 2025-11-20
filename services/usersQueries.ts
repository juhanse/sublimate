import api from '@/services/api';

export type User = {
	id: string,
	username: string,
	age: number,
	avatar: string,
	xp: number,
	ranks: {
		id: string,
		name: string,
		xp_required: number,
	},
	nb_projects: number,
	role: string,
	profile_type: string,
	motivation: string,
	heard: string,
	onboarding: number,
	updated_at: string,
	created_at: string,
};

export type UpdateUser = Partial<{
	username: string,
	age: number,
	avatar: string,
	xp: number,
	role: "user" | "premium",
	profile_type: "student" | "sports" | "artist" | "entrepreneur" | "other"
	motivation: "softness" | "midness" | "hardness",
	heard: "internet" | "app_store" | "social_network" | "friends" | "other",
	onboarding: 1 | 2 | 3 | 4 | 5 | 6,
}>;

export const fetchMe = async (): Promise<User> => {
	const res = await api.get<User>('/users/me');
	return res.data;
};

export const updateMe = async (userData: UpdateUser): Promise<User> => {
	const res = await api.patch<User>('/users/me', userData);
	return res.data;
};

export const updateOnboarding = async (onboardingStep: number): Promise<User> => {
	const res = await api.patch<User>('/users/me', { onboarding: onboardingStep });
	return res.data;
};

export const deleteMe = async (): Promise<void> => {
	await api.delete('/users/me');
};

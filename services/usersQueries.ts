import api from '@/services/api';

export type User = {
	id: string,
	username: string,
	email: string,
	age: number,
	avatar: string,
	xp: number,
	ranks: {
		id: string,
		name: string,
		xp_required: number,
	},
	nb_projects: number,
	onboarding: number,
	profile_type: string,
	motivation: string,
	heard: string,
	role: string,
	updated_at: string,
	created_at: string,
};

export type UpdateUser = Partial<{
	username: string,
	email: string,
	password: string,
	role: "user" | "premium",
	age: number,
	avatar: string,
	xp: number,
	profile_type: "student" | "sports" | "artist" | "entrepreneur" | "other"
	motivation: "softness" | "midness" | "hardness",
	heard: "internet" | "app_store" | "social_network" | "friends" | "other",
	onboarding: 1 | 2 | 3 | 4 | 5,
}>;

export const fetchMe = async (): Promise<User> => {
	const res = await api.get<User>('/users/me');
	return res.data;
};

export const updateMe = async (userData: UpdateUser): Promise<User> => {
	const res = await api.patch<User>('/users/me', userData);
	return res.data;
};

export const deleteMe = async (): Promise<void> => {
	await api.delete('/users/me');
};

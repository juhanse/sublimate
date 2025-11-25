import api from './api';

export type LoginType = {
	email: string;
	password: string;
}

export type RegisterType = {
	username: string;
	email: string;
	password: string;
}

type AuthResponse = {
	access_token: string;
}

export const authSignIn = async (userData: LoginType): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/login', userData);
	return res.data;
};

export const authSignUp = async (userData: RegisterType): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/register', userData);
	return res.data;
};

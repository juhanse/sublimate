import api from '@/services/api';

export type LoginUser = {
	email: string;
	password: string;
}

export type RegisterUser = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
}

type AuthResponse = {
	access_token: string;
}

export const postLogin = async (userData: LoginUser): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/login', userData);
	return res.data;
};

export const postRegister = async (userData: RegisterUser): Promise<AuthResponse> => {
	const res = await api.post<AuthResponse>('/auth/register', userData);
	return res.data;
}

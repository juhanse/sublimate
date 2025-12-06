import api from '@/services/api';

export type Category = {
	id: string,
	name: string,
	updated_at: string,
	created_at: string,
};

export const fetchCategories = async (): Promise<Category[]> => {
	const res = await api.get<Category[]>('/categories');
	return res.data;
};

export const fetchCategoryById = async (categoryId: string): Promise<Category> => {
	const res = await api.get<Category>(`/categories/${categoryId}`);
	return res.data;
};

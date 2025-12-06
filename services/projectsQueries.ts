import api from '@/services/api';

export type Step = {
	id: string,
	project_id: string,
	step_index: number,
	name: string,
	deadline: string,
	is_completed: boolean,
	updated_at: string,
	created_at: string
}

export type Project = {
	id: string,
	user_id: string,
	name: string,
	thumbnail: string,
	count_step: number,
	current_step: string,
	status: "active" | "inactive",
	updated_at: string,
	created_at: string,
	projects_categories: {
		categories: {
			id: string,
			name: string,
			updated_at: string,
			created_at: string,
		}
	}[],
	steps: Step[]
};

export type CreateProject = {
	name: string,
	thumbnail?: string,
	categories: string[],
	steps: Step[],
};

export type UpdateProject = Partial<{
	name: string,
	thumbnail: string,
	categories: string[],
	steps: Step[],
}>;

export const fetchMeProjects = async (status?: 'active' | 'inactive'): Promise<Project[]> => {
	const res = await api.get<Project[]>('/projects/me', { params: { status } });
	return res.data;
};

export const fetchMeProjectById = async (projectId: string): Promise<Project> => {
	const res = await api.get<Project>(`/projects/me/${projectId}`);
	return res.data;
};

export const createProject = async (projectData: CreateProject): Promise<Project> => {
	const res = await api.post<Project>('/projects', projectData);
	return res.data;
};

export const updateMeProjectById = async (projectId: string, projectData: UpdateProject): Promise<Project> => {
	const res = await api.patch<Project>(`/projects/me/${projectId}`, projectData);
	return res.data;
};

export const deleteMeProjectById = async (projectId: string): Promise<Project> => {
	const res = await api.delete<Project>(`/projects/me/${projectId}`);
	return res.data;
};

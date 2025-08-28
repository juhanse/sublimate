import api from '@/services/api';

export type Project = {
	id: string,
	user_id: string,
	name: string,
	end_date: string,
	progress_level: number,
	steps_count: number,
	status: "active" | "inactive",
	updated_at: string,
	created_at: string,
};

export type UpdateProject = Partial<{
	name: string,
	thumbnail: string,
	end_date: string,
	progress_level: number,
	steps_count: number,
	status: "active" | "inactive",
}>;

export type CreateProject = {
	name: string,
}

export const fetchMeProjects = async (): Promise<Project[]> => {
	const res = await api.get<Project[]>('/projects/me');
	return res.data;
};

export const fetchMeProjectsActive = async (): Promise<Project[]> => {
	const res = await api.get<Project[]>('/projects/me/active');
	return res.data;
};

export const fetchMeProjectsInactive = async (): Promise<Project[]> => {
	const res = await api.get<Project[]>('/projects/me/inactive');
	return res.data;
};

export const createProject = async (projectData: CreateProject): Promise<Project> => {
	const res = await api.post<Project>('/projects', projectData);
	return res.data;
};

export const updateMeProjectById = async (projectId: string, projectData: Partial<UpdateProject>): Promise<Project> => {
	const res = await api.patch<Project>(`/projects/me/${projectId}`, projectData);
	return res.data;
};

export const deleteMeProjectById = async (projectId: string): Promise<Project> => {
	const res = await api.delete(`/projects/me/${projectId}`);
	return res.data;
};

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { IProject, ProjectFormData } from "../types";

export async function createProject(data: ProjectFormData) {
  try {
    const { data: response } = await api.post<string>("/projects", data);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al crear el proyecto");
  }
}

export async function getProjects() {
  try {
    const { data: response } = await api.get<IProject[]>("/projects");
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

export async function getProjectById(id: IProject["_id"]) {
  try {
    const { data: response } = await api.get<IProject>(`/projects/${id}`);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

export async function updateProject({
  id,
  formData,
}: {
  id: IProject["_id"];
  formData: ProjectFormData;
}) {
  try {
    const { data: response } = await api.put<string>(
      `/projects/${id}`,
      formData
    );
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

export async function deleteProject(id: IProject["_id"]) {
  try {
    const { data: response } = await api.delete<string>(`/projects/${id}`);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

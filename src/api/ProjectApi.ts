import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ProjectFormData } from "../types";

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

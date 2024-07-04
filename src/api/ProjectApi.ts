import api from "lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(data: ProjectFormData) {
  try {
    const { data: response } = await api.post("/projects", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

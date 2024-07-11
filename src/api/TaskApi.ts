import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { IProject, TaskFormData } from "../types"

export async function createTask({
  data,
  projectId,
}: {
  data: TaskFormData;
  projectId: IProject["_id"];
}) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data: response } = await api.post<string>(url, data);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al crear la tarea");
  }
}

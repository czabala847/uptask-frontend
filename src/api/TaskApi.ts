import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { IProject, ITask, TaskFormData } from "../types";

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

export async function getTaskById({
  taskId,
  projectId,
}: {
  taskId: ITask["_id"];
  projectId: IProject["_id"];
}) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data: response } = await api.get<ITask>(url);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

export async function updateTask({
  taskId,
  projectId,
  formData,
}: {
  taskId: ITask["_id"];
  projectId: IProject["_id"];
  formData: TaskFormData;
}) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data: response } = await api.put<string>(url, formData);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

export async function deleteTask({
  taskId,
  projectId,
}: {
  taskId: ITask["_id"];
  projectId: IProject["_id"];
}) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data: response } = await api.delete<string>(url);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al obtener los proyectos");
  }
}

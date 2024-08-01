import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { UserLoginForm, UserRegistrationForm } from "../types"

export async function createAccount(data: UserRegistrationForm) {
  try {
    const { data: response } = await api.post<string>(
      "/auth/create-account",
      data
    );
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al crear la cuenta");
  }
}

export async function confirmAccount(token: string) {
  try {
    const { data: response } = await api.post<string>("/auth/confirm-account", {
      token,
    });
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al confirmar la cuenta");
  }
}

export async function authenticateUser(data: UserLoginForm) {
  try {
    const { data: response } = await api.post<string>(
      "/auth/login",
      data
    );
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Error al crear la cuenta");
  }
}
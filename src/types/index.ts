export interface IProject {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
  tasks: ITask[];
}

export interface ProjectFormData extends Omit<IProject, "_id" | "tasks"> {}

type TaskStatus =
  | "pending"
  | "onHold"
  | "inProgress"
  | "underReview"
  | "completed";

export interface ITask {
  _id: string;
  name: string;
  description: string;
  project: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData extends Pick<ITask, "name" | "description"> {}

export interface Auth {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserLoginForm extends Pick<Auth, "email" | "password"> {}
export interface UserRegistrationForm
  extends Pick<Auth, "email" | "password" | "name" | "password_confirmation"> {}
export interface RequestConfirmationCodeForm {
  email: string;
}
export interface ForgotPasswordForm {
  email: string;
}
export interface ConfirmToken {
  token: string;
}

export interface NewPasswordForm {
  password: string;
  password_confirmation: string;
}

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

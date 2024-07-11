export interface IProject {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
}

export interface ProjectFormData extends Omit<IProject, "_id"> {}

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
}

export interface TaskFormData extends Pick<ITask, "name" | "description"> {}

export interface IProject {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
}

export interface ProjectFormData extends Omit<IProject, "_id"> {}

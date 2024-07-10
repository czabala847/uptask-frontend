import { updateProject } from "@/api/ProjectApi";
import { IProject, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm";

interface Props {
  data: IProject;
}

export const EditProjectForm: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", data._id] });

      toast.success(response);
      navigate("/");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const dataRequest = {
      formData,
      id: data._id,
    };

    updateMutation.mutate(dataRequest);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar el nuevo proyecto
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver a proyectos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar proyecto"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white p-3 uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

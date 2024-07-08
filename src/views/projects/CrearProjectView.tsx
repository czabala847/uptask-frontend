import { createProject } from "@/api/ProjectApi";
import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectFormData } from "types";

export const CrearProjectView = () => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({ defaultValues: initialValues });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (response) => {
      toast.success(response);
      navigate("/");
    },
    onError: ({message}) => {
      toast.error(message);
    },
  });

  const handleForm = (data: ProjectFormData) => {
    createProjectMutation.mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un nuevo proyecto
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
            value="Crear proyecto"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white p-3 uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

import { createTask } from "@/api/TaskApi"
import { TaskFormData } from "@/types/index"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import TaskForm from "./TaskForm"

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const show = modalTask ? true : false;

  const projectId = params.projectId!;

  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (response) => {
      toast.success(response);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleCreateTask = (formData: TaskFormData) => {
    mutate({ data: formData, projectId });
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form
                    onSubmit={handleSubmit(handleCreateTask)}
                    className="mt-10 space-y-3"
                    noValidate
                  >
                    <TaskForm register={register} errors={errors} />

                    <input
                      type="submit"
                      value="Guardar tarea"
                      className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white p-3 uppercase font-bold cursor-pointer transition-colors"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

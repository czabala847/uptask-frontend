import { getTaskById, updateStatusTask } from "@/api/TaskApi"
import { statusTranslations } from "@/locales/es"
import { ITask } from "@/types/index"
import { formatDate } from "@/utils/utilis"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"
import { toast } from "react-toastify"

export default function TaskModalDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(response);
      // navigate("/");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { data, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId,
    retry: false,
  });

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    mutate({ taskId, projectId, status: e.target.value as ITask["status"] });
  };

  if (isError) {
    toast.error((error as { [key: string]: string }).message, {
      toastId: "error",
    });

    return <Navigate to={`/project/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={!!taskId} as={Fragment}>
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
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.project}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>

                      <select
                        value={data.status}
                        onChange={handleChangeStatus}
                        className="w-full p-3 bg-white border border-gray-300"
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

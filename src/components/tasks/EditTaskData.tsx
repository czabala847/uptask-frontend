import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export const EditTaskData = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;
  const projectId = params.projectId!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId,
  });

  if (isError) return <Navigate to="/404" />;
  if (data) return <EditTaskModal task={data} />;
};

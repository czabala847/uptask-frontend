import { getProjectById } from "@/api/ProjectApi"
import { EditProjectForm } from "@/components/projects/EditProjectForm"
import { useQuery } from "react-query"
import { Navigate, useParams } from "react-router-dom"

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getProjectById(projectId),
    queryKey: ["editProject", projectId],
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data) {
    return <EditProjectForm data={data} />;
  }
};

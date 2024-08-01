import { AppLayout } from "@/layouts/AppLayout"
import { DashboardView } from "@/views/DashboardView"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLayout } from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import { CrearProjectView } from "./views/projects/CrearProjectView"
import { EditProjectView } from "./views/projects/EditProjectView"
import { ProjectDetailsView } from "./views/projects/ProjectDetailsView"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<DashboardView />} />
          <Route path="/projects/create" element={<CrearProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

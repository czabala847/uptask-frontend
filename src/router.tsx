import { AppLayout } from "@/layouts/AppLayout"
import { DashboardView } from "@/views/DashboardView"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CrearProjectView } from "./views/projects/CrearProjectView"
import { EditProjectView } from './views/projects/EditProjectView'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<DashboardView />} />
          <Route path="/projects/create" element={<CrearProjectView />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

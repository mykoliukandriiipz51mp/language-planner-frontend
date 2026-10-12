import { PagesLayout } from "@/components/layouts/PagesLayout";
import TaskManagerKanbanView from "@/components/TasksManagementKanbanView";

export default function TasksManager() {
  return (
    <PagesLayout>
      <TaskManagerKanbanView />
    </PagesLayout>
  );
}

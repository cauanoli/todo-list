import { renderTasks } from "../components/task-list";

export function renderAllTasksPage({ tasksNotDone = [], tasksDone = [] }) {
  const container = document.querySelector("#content");

  const title = document.createElement("h1");
  title.innerText = "All tasks";
  title.classList = "title";

  const tasksContainer = renderTasks({ tasksDone, tasksNotDone });

  container.appendChild(title);
  container.appendChild(tasksContainer);
}

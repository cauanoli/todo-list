import { renderTasks } from "../components/task-list";

export function renderProjectTasks(project) {
    const container = document.querySelector("#content");

    const title = document.createElement("h1");
    title.innerText = project.name;
    title.classList = "title";

    const tasksContainer = renderTasks({
        tasksDone: project.getDoneTasks(),
        tasksNotDone: project.getNotDoneTasks(),
    });

    container.appendChild(title);
    container.appendChild(tasksContainer);
}

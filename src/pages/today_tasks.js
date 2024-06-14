import { format } from "date-fns";
import { renderTasks } from "../components/task-list";

export function renderTodayTasks({
    todayDoneTasks = [],
    todayNotDoneTasks = [],
}) {
    const container = document.querySelector("#content");

    const header = document.createElement("header");
    header.classList = "header";

    const title = document.createElement("h1");
    title.classList = "title";
    title.innerText = "Today";

    const date = document.createElement("p");
    date.classList = "date";
    date.innerText = format(new Date(), "yyyy/MM/dd");

    header.appendChild(title);
    header.appendChild(date);

    const tasksContainer = renderTasks({
        tasksDone: todayDoneTasks,
        tasksNotDone: todayNotDoneTasks,
    });

    container.appendChild(header);
    container.appendChild(tasksContainer);
}

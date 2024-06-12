import { createProject } from "./lib/project";
import { createTask } from "./lib/task";
import { renderAllTasksPage } from "./pages/all_tasks";
import { renderTodayTasks } from "./pages/today_tasks";

const project = createProject({
    name: "hahaha",
});

project.addTask(
    createTask({
        title: "life",
        done: true,
        description: "hjahaa",
        dueDate: new Date(),
        dueTime: "12:20",
        important: false,
        projectId: project.id,
    })
);

/*
renderAllTasksPage({
    tasksDone: project.getDoneTasks(),
    tasksNotDone: project.getNotDoneTasks(),
});

*/

renderTodayTasks({
    todayDoneTasks: project.getTodayDoneTasks(),
    todayNotDoneTasks: project.getTodayNotDoneTasks(),
});

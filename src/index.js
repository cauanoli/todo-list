import { createProject } from "./lib/project";
import { createTask } from "./lib/task";
import { renderAllTasksPage } from "./pages/all_tasks";
import { renderTodayTasks } from "./pages/today_tasks";
import { renderImportantTasks } from "./pages/important_tasks";
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
        important: true,
        projectId: project.id,
    })
);

project.addTask(
    createTask({
        title: "haha",
        done: false,
        description: "hjahaa",
        dueDate: new Date("2023/10/23"),
        dueTime: "12:20",
        important: true,
        projectId: project.id,
    })
);

console.log(project.getTasks());

/*
renderAllTasksPage({
    tasksDone: project.getDoneTasks(),
    tasksNotDone: project.getNotDoneTasks(),
});

renderTodayTasks({
    todayDoneTasks: project.getTodayDoneTasks(),
    todayNotDoneTasks: project.getTodayNotDoneTasks(),
});

*/

renderImportantTasks({
    tasksDone: project.getImportantDoneTasks(),
    tasksNotDone: project.getImportantNotDoneTasks(),
});

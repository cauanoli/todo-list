import "./style.css";

import { renderProjectsButtons } from "./components/project-button-list";

import { createTask } from "./lib/task";
import { StateManager } from "./lib/state_manager";
import {
    updateProjectButtons,
    goToTodayTasksPage,
    addEvents,
} from "./lib/pages";

(function () {
    function init() {
        renderProjectsButtons(StateManager.getProjects());
        updateProjectButtons();
        addEvents();
        goToTodayTasksPage();
    }

    function test() {
        const project = StateManager.addNewProject({
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

        const project2 = StateManager.addNewProject({
            name: "other project",
        });

        project2.addTask(
            createTask({
                title: "task",
                description: "another task",
                done: false,
                dueDate: new Date(),
                dueTime: "10:32",
                important: false,
                projectId: project2.id,
            })
        );
    }

    init();
})();

import { renderProjectButton } from "./project-button";

export function renderProjectsButtons(projects) {
    const container = document.querySelector("#main-nav__projects");
    projects.forEach((project) => {
        const projectButton = renderProjectButton(project);
        container.appendChild(projectButton);
    });
}

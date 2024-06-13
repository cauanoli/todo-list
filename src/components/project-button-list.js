import { renderProjectButton } from "./project-button";

export function renderProjectsButtons(projects) {
    const container = document.querySelector("#main-nav__projects");

    clearContainer(container);

    projects.forEach((project) => {
        const projectButton = renderProjectButton(project);
        container.appendChild(projectButton);
    });
}

function clearContainer(container) {
    [...container.childNodes].forEach((child) => {
        container.removeChild(child);
    });
}

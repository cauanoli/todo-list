export function renderProjectButton(project) {
    const projectButton = document.createElement("button");
    projectButton.classList =
        "main-nav__projects__project-button button project-button";
    projectButton.innerText = project.name;
    projectButton["data-id"] = project.id;

    return projectButton;
}

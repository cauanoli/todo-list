import "./style.css";

import {
    updateProjectButtons,
    goToTodayTasksPage,
    addEvents,
} from "./lib/pages";

(function () {
    function init() {
        updateProjectButtons();
        addEvents();
        goToTodayTasksPage();
    }

    init();
})();

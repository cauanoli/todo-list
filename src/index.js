import "./style.css";

import {
    updateProjectButtons,
    goToTodayTasksPage,
    addEvents,
} from "./lib/pages";
import { StateManager } from "./lib/state_manager";

(function () {
    function init() {
        StateManager.initializeData();
        updateProjectButtons();
        addEvents();
        goToTodayTasksPage();
    }

    init();
})();

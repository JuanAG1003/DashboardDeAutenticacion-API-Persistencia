

import { logingView } from "./views/login.js";
import { signupView } from "./views/signup.js";
import { dashboardView } from "./views/dashboard.js";
import { isAuthenticated } from "./logic/profileLogic.js";

export const app = document.querySelector("#app");

const routes = {
  login: logingView,
  signup: signupView,
  dashboard: dashboardView,
};
let currentView = null;

export const navigate = (routeName) => {
  const view = routes[routeName]();
  if(!view) return;

  if(currentView && currentView.cleanup) {
    currentView.cleanup();
  }
  
  currentView = view;
  app.innerHTML = view.render;
  view.events();
}


if(isAuthenticated()) {
  navigate("dashboard");
  
} else {
  navigate("login");
}







import { logViews } from "./views/login.js";
import { isAuthenticated } from "./utils/auth.js";
import { dashboardViews } from "./views/dashboard.js";

export const app = document.querySelector("#app");

export const navigate = (viewName) => {
  const view = views[viewName]
  if(!view) return
  
  app.innerHTML = view.render
  view.events()

}

const views = Object.assign(logViews, dashboardViews) 

if(isAuthenticated()) {
  navigate("dashboard")
  
} else {
  navigate("login")
}





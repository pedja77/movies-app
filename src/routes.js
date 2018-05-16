import Vue from "vue"
import VueRouter from "vue-router"

import AppMovies from "./pages/AppMovies"

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/movies" },
  { path: "/movies", component: AppMovies, name: "movies" }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router

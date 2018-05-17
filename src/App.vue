<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import AppMovies from "./pages/AppMovies"
import NavBar from "./components/NavBar"
//import MovieForm from "./components/MovieForm"

export default {
  name: "app",
  components: {
    AppMovies,
    NavBar
  }
}
</script>



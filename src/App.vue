<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container mt-4">
      <b-row>
        <b-col cols="8">
          <router-view></router-view>
        </b-col>
        <b-col cols="4">
          <movie-form />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppMovies from "./pages/AppMovies"
import NavBar from "./components/NavBar"
import MovieForm from "./components/MovieForm"

export default {
  name: "app",
  components: {
    AppMovies,
    NavBar,
    MovieForm
  }
}
</script>



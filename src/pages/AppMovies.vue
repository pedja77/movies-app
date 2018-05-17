<template>
  <div>
    <h3>Movies List</h3>
    {{movies}}
  </div>
</template>

<script>
import Movies from "../services/Movies"

export default {
  name: "AppMovies",
  data() {
    return {
      movies: []
    }
  },
  methods: {
    getAllMovies() {
      Movies.index().then(({ data }) => {
        this.movies = data
      })
    }
  },
  created() {
    this.getAllMovies()
  }
}
</script>

<style>
</style>

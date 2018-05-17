<template>
  <div class="container mt-4">
    <b-row>
      <b-col cols="8">
        <div>
          <h3>List of movies</h3>
          {{ movies }}
        </div>
      </b-col>
      <b-col cols="4">
        <div>
          <h3>Add new movie</h3>
          <b-form @submit.prevent="storeMovie">
            <b-form-group label="Title:">
              <b-form-input type="text" v-model="movieForm.title" placeholder="Enter movie title">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Director:">
              <b-form-input type="text" v-model="movieForm.director" placeholder="Enter movie director">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Link to cover image:">
              <b-form-input type="text" v-model="movieForm.imageUrl" placeholder="Enter link to movie poster">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Duration:">
              <b-form-input type="text" v-model="movieForm.duration" placeholder="Enter movie duration">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Release date:">
              <b-form-input type="text" v-model="movieForm.releaseDate" placeholder="Enter movie release date">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Genre:">
              <b-form-input type="text" v-model="movieForm.genre" placeholder="Enter movie genre">
              </b-form-input>
            </b-form-group>
            <b-button type="submit">Submit</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Movies from "../services/Movies"

export default {
  name: "AppMovies",
  components: {},
  data() {
    return {
      movies: [],
      movieForm: {
        title: "",
        director: "",
        imageUrl: "",
        duration: "",
        releaseDate: "",
        genre: ""
      }
    }
  },
  methods: {
    getAllMovies() {
      Movies.index().then(({ data }) => {
        this.movies = data
      })
    },
    storeMovie() {
      Movies.store(this.movieForm).then(response => {
        console.log(response.statusText)
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

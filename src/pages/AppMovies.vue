<template>
  <div class="container mt-4">
    <b-row>
      <b-col cols="8">
        <div>
          <h3>List of movies</h3>
          <movie-search @search-term-updated="onSearchTermUpdate" />
          <div v-for="movie in filteredMovies" :key="movie.id">
            <b-card :title="movie.title" :img-src="movie.imageUrl" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
              <p class="card-text">
                <ul>
                  <li>Director: {{ movie.director }}</li>
                  <li>Genre: {{ movie.genre }}</li>
                  <li>Duration: {{ movie.duration }}</li>
                  <li>Release date: {{ movie.releaseDate }}</li>
                </ul>
              </p>
              <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
          </div>
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
import MovieRow from "../components/MovieRow"
import MovieSearch from "../components/MovieSearch"

export default {
  name: "AppMovies",
  components: {
    MovieRow,
    MovieSearch
  },
  data() {
    return {
      movies: [],
      filteredMovies: [],
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
        this.filteredMovies = this.movies
      })
    },
    storeMovie() {
      Movies.store(this.movieForm).then(response => {
        Object.keys(this.movieForm).forEach(key => (this.movieForm[key] = ""))
        this.getAllMovies()
      })
    },
    onSearchTermUpdate(searchTerm) {
      if (searchTerm) {
        this.filteredMovies = this.movies.filter(
          movie =>
            movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        )
        return
      }
      this.filteredMovies = this.movies
    }
  },
  beforeRouteEnter(to, from, next) {
    Movies.index().then(({ data }) => {
      next(context => {
        context.movies = data
        context.filteredMovies = context.movies
      })
    })
  }
}
</script>

<style>
</style>

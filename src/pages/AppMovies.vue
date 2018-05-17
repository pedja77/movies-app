<template>
  <div class="container mt-4">
    <b-row>
      <b-col cols="8">
        <div>
          <h3>List of movies</h3>
          <movie-search @search-term-updated="onSearchTermUpdate" />
          <div>
            <p>Movies selected: {{ numberOfSelectedMovies }}</p>
          </div>
          <div>
            <b-button variant="primary" @click="selectAllMovies">Select all</b-button>
            <b-button variant="primary" @click="deselectAllMovies">Deselect all</b-button>
          </div>
          <div>
            <b-button variant="primary" @click="sortMovies('title', 'asc')">Sort by name asc</b-button>
            <b-button variant="primary" @click="sortMovies('title', 'desc')">Sort by name desc</b-button>
            <b-button variant="primary" @click="sortMovies('date', 'asc')">Sort by date asc</b-button>
            <b-button variant="primary" @click="sortMovies('date', 'desc')">Sort by date desc</b-button>
          </div>
          <div class="container mt-4">
            <div v-if="isSearchResultEmpty">
              <p>No movies foud.</p>
            </div>
            <div v-for="movie in filteredMovies" :key="movie.id">
              <movie-row :movie="movie" @movie-selected="onMovieSelected" :selected-movies-ids="selectedMoviesIds" @movie-deselected="onMovieDeselected" />
            </div>
            <movies-paginator :pages="pages" @selected-page="onSelectedPage" v-if="pages > 1"/>
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
import MoviesPaginator from '../components/MoviesPaginator'

export default {
  name: "AppMovies",
  components: {
    MovieRow,
    MovieSearch,
    MoviesPaginator
  },
  data() {
    return {
      movies: [],
      filteredMovies: [],
      selectedMoviesIds: [],
      selectedPage: 1,
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
      // Uraditi kao computed***************
      if (searchTerm) {
        this.filteredMovies = this.movies.filter(
          movie =>
            movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        )
        return
      }
      this.filteredMovies = this.movies
    },
    onMovieSelected(id) {
      this.selectedMoviesIds.push(id)
      console.log(this.selectedMoviesIds)
    },
    onMovieDeselected(id) {
      this.selectedMoviesIds.splice(this.selectedMoviesIds.indexOf(id), 1)
      console.log(this.selectedMoviesIds)
    },
    selectAllMovies() {
      this.selectedMoviesIds = this.filteredMovies.map(movie => movie.id)
    },
    deselectAllMovies() {
      this.selectedMoviesIds = []
    },
    sortMovies(by, direction) {
      if (by === "title") {
        if (direction === "asc") {
          this.filteredMovies.sort((a, b) => {
            let titleA = a.title.toLowerCase()
            let titleB = b.title.toLowerCase()
            if (titleA < titleB) return -1
            if (titleA > titleB) return 1
            if (titleA === titleB) return 0
          })
        } else {
          this.filteredMovies.sort((a, b) => {
            let titleA = a.title.toLowerCase()
            let titleB = b.title.toLowerCase()
            if (titleA > titleB) return -1
            if (titleA < titleB) return 1
            if (titleA === titleB) return 0
          })
        }
      } else {
        if (direction === "asc") {
          this.filteredMovies.sort((a, b) => {
            return a.releaseDate - b.releaseDate
          })
        } else {
          this.filteredMovies.sort((a, b) => {
            return b.releaseDate - a.releaseDate
          })
        }
      }
    },
    onSelectedPage() {

    }
  },
  beforeRouteEnter(to, from, next) {
    Movies.index().then(({ data }) => {
      next(context => {
        context.movies = data
        context.filteredMovies = context.movies
      })
    })
  },
  computed: {
    isSearchResultEmpty() {
      return !this.filteredMovies.length
    },
    numberOfSelectedMovies() {
      return this.selectedMoviesIds.length
    },
    pages() {
      return Math.ceil(this.filteredMovies.length / 5)
    },
    currentlyVisibleMovies() {
      let bottomLimit = (this.selectedPage -1) * 5
      let topLimit = bottomLimit + 5 
      return this.filteredMovies.filter((movie, index) => {
        return index >= bottomLimit && index < topLimit
      })
    }
  }
}
</script>

<style>
</style>

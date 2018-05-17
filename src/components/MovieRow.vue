<template>
  <div>
    <b-card :title="movie.title" :img-src="movie.imageUrl" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2" :class="{ 'bg-dark text-white': selected }">
      <p class="card-text">
        <ul>
          <li>Director: {{ movie.director }}</li>
          <li>Genre: {{ movie.genre }}</li>
          <li>Duration: {{ movie.duration }}</li>
          <li>Release date: {{ movie.releaseDate }}</li>
        </ul>
      </p>
      <b-button variant="primary" @click="selectMovie">Select</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "MovieRow",
  props: {
    movie: {
      type: Object,
      required: true
    },
    selectedMoviesIds: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectMovie() {
      if (!this.selected) {
        this.$emit("movie-selected", this.movie.id)
      } else {
        this.$emit("movie-deselected", this.movie.id)
      }
      // console.log(this.selectedMoviesIds)
    }
  },
  computed: {
    selected() {
      return this.selectedMoviesIds.indexOf(this.movie.id) > -1
    }
  }
}
</script>

<style>
</style>

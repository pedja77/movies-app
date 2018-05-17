<template>
  <b-form>
    <b-form-group label="Search:">
      <b-form-input type="text" placeholder="Search movies..." @input="onSearchTermChange">
      </b-form-input>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "MovieSearch",
  methods: {
    onSearchTermChange(searchTerm) {
      this.$emit("search-term-updated", searchTerm)
    }
  }
}
</script>

<style>
</style>

import Axios from "axios"

const axios = Axios.create({
  baseURL: "http://localhost:3000/api"
})

export default {
  index() {
    return axios.get("/movies")
  },

  store(movie) {
    return axios.post("/movies", movie)
  }
}

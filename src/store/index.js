import Vue from 'vue'
import Vuex from 'vuex'
import Movies from '../services/Movies'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        counter: 4,
        searchTerm: '',
        movies: []
    },
    getters: {
        getCounter(state) {
            return state.counter
        },
        getSearchTerm(state) {
            return state.searchTerm
        },
        getMovies(state) {
            return state.movies
        }
    },
    mutations: {
        incrementCounter(state) {
            state.counter++
        },
        setSearchTerm(state, searchTerm) {
            state.searchTerm = searchTerm
        },
        setMovies(state, movies) {
            state.movies = movies
        }
    },
    actions: {
        incrementCounterAction(store) {
            setTimeout(() => {
                store.commit('incrementCounter')
            }, 3000)
        },
        fetchMovies(store) {
            console.log('fetchMovies')
            Movies.index().then(response => {
                let movies = response.data.map(movie => {
                    movie.duration = Number(movie.duration)
                    return movie
                })
                store.commit('setMovies', movies)
            })
        }
    }
})
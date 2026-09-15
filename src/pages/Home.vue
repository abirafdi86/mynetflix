<script setup lang="ts">
import { computed } from 'vue'

import HeroBanner from '../components/movie/HeroBanner.vue'
import MovieRow from '../components/movie/MovieRow.vue'
import { getMoviesByGenre, getTrendingMovies, movies } from '../data/movies'
import type { Movie } from '../types/movie'

const featuredMovie = computed<Movie | undefined>(() => movies.find((movie) => movie.featured === true))
const trendingMovies = computed<Movie[]>(getTrendingMovies)
const actionMovies = computed<Movie[]>(() => getMoviesByGenre('Action'))
const comedyMovies = computed<Movie[]>(() => getMoviesByGenre('Comedy'))
const dramaMovies = computed<Movie[]>(() => getMoviesByGenre('Drama'))
const myListMovies = computed<Movie[]>(() => [])
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#141414] pb-16 text-white sm:pb-20">
    <HeroBanner v-if="featuredMovie" :movie="featuredMovie" />

    <div class="relative z-10 -mt-1">
      <MovieRow title="Trending Now" :movies="trendingMovies" />
      <MovieRow title="Action" :movies="actionMovies" />
      <MovieRow title="Comedy" :movies="comedyMovies" />
      <MovieRow title="Drama" :movies="dramaMovies" />
      <MovieRow v-if="myListMovies.length" title="My List" :movies="myListMovies" />
    </div>
  </main>
</template>

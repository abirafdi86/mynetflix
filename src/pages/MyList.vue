<script setup lang="ts">
import { computed } from 'vue'

import MovieCard from '../components/movie/MovieCard.vue'
import { getMovieById } from '../data/movies'
import { useMyListStore } from '../stores/myList'
import type { Movie } from '../types/movie'

const myListStore = useMyListStore()
myListStore.hydrate()

const savedMovies = computed<Movie[]>(() =>
  myListStore.movieIds
    .map((movieId) => getMovieById(movieId))
    .filter((movie): movie is Movie => movie !== undefined),
)
</script>

<template>
  <main class="min-h-screen bg-[#141414] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12">
    <section class="mx-auto max-w-7xl">
      <h1 class="text-3xl font-semibold sm:text-4xl">My List</h1>

      <div v-if="savedMovies.length" class="my-list-grid mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCard v-for="movie in savedMovies" :key="movie.id" :movie="movie" />
      </div>

      <div v-else class="flex min-h-[48vh] flex-col items-center justify-center px-4 text-center text-zinc-400">
        <p class="text-lg text-zinc-200">Your list is empty.</p>
        <p class="mt-2 text-sm">Movies you add to your list will appear here.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.my-list-grid :deep(a) {
  width: 100%;
}
</style>

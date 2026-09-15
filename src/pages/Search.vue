<script setup lang="ts">
import { computed, ref } from 'vue'

import MovieCard from '../components/movie/MovieCard.vue'
import { movies } from '../data/movies'

const query = ref('')

const filteredMovies = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()

  if (!normalizedQuery) {
    return movies
  }

  return movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(normalizedQuery)
    const matchesGenre = movie.genres.some((genre) => genre.toLowerCase().includes(normalizedQuery))
    return matchesTitle || matchesGenre
  })
})
</script>

<template>
  <main class="min-h-screen bg-[#141414] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12">
    <section class="mx-auto max-w-7xl">
      <h1 class="text-3xl font-semibold sm:text-4xl">Search</h1>

      <div class="mt-7 max-w-xl">
        <label for="movie-search" class="sr-only">Search movies</label>
        <input
          id="movie-search"
          v-model="query"
          type="search"
          placeholder="Search movies..."
          autocomplete="off"
          class="w-full border-b border-zinc-600 bg-transparent px-0 py-3 text-lg text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-white"
        />
      </div>

      <p v-if="query.trim() && !filteredMovies.length" class="mt-16 text-center text-lg text-zinc-400">
        No movies found for "{{ query }}"
      </p>

      <div v-else class="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
      </div>
    </section>
  </main>
</template>

<style scoped>
.grid :deep(a) {
  width: 100%;
}
</style>

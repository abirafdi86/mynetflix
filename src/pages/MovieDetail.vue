<script setup lang="ts">
import { Check, Info, Play, Plus } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import BaseButton from '../components/common/BaseButton.vue'
import MovieImage from '../components/common/MovieImage.vue'
import MovieCard from '../components/movie/MovieCard.vue'
import { getMovieById, getMoviesByGenre } from '../data/movies'
import { useMyListStore } from '../stores/myList'
import type { Movie } from '../types/movie'

const route = useRoute()
const router = useRouter()
const myListStore = useMyListStore()

myListStore.hydrate()

const movie = computed<Movie | undefined>(() => {
  const routeId = route.params.id
  const movieId = Array.isArray(routeId) ? routeId[0] : routeId
  return movieId ? getMovieById(movieId) : undefined
})

const relatedMovies = computed<Movie[]>(() => {
  const genre = movie.value?.genres[0]
  if (!genre || !movie.value) return []

  return getMoviesByGenre(genre).filter((relatedMovie) => relatedMovie.id !== movie.value?.id)
})

const isInMyList = computed<boolean>(() => (movie.value ? myListStore.isInMyList(movie.value.id) : false))

function playMovie(): void {
  if (movie.value) {
    void router.push({ name: 'watch', params: { id: movie.value.id } })
  }
}

function toggleMyList(): void {
  if (movie.value) {
    myListStore.toggleMovie(movie.value.id)
  }
}
</script>

<template>
  <main class="min-h-screen bg-[#141414] pb-20 text-white">
    <section v-if="movie" class="relative flex min-h-[72svh] items-end overflow-hidden pt-20 sm:min-h-[80svh]">
      <MovieImage :src="movie.backdrop" :alt="movie.title" :title="movie.title" type="backdrop" class="absolute inset-0" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/15" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/10 to-black/35" />

      <div class="relative z-10 max-w-2xl px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-300">Movie</p>
        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">{{ movie.title }}</h1>
        <div class="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
          <span>{{ movie.year }}</span>
          <span class="h-1 w-1 rounded-full bg-zinc-500" />
          <span>{{ movie.maturityRating }}</span>
          <span class="h-1 w-1 rounded-full bg-zinc-500" />
          <span>{{ movie.duration }} min</span>
        </div>
        <p class="mt-5 max-w-xl text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">{{ movie.description }}</p>
        <div class="mt-7 flex flex-wrap gap-3">
          <BaseButton @click="playMovie"><Play :size="19" fill="currentColor" /> Play</BaseButton>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-700/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="toggleMyList"
          >
            <Plus v-if="!isInMyList" :size="19" />
            <Check v-else :size="19" />
            My List
          </button>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400" aria-label="Genres">
          <template v-for="(genre, index) in movie.genres" :key="genre">
            <span>{{ genre }}</span>
            <span v-if="index < movie.genres.length - 1" aria-hidden="true" class="text-zinc-600">/</span>
          </template>
        </div>
      </div>
    </section>

    <section v-if="movie && relatedMovies.length" class="mt-10 px-5 sm:mt-14 sm:px-8 lg:px-12">
      <h2 class="text-xl font-semibold sm:text-2xl">More Like This</h2>
      <div class="detail-grid mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:grid-cols-5">
        <MovieCard v-for="relatedMovie in relatedMovies" :key="relatedMovie.id" :movie="relatedMovie" />
      </div>
    </section>

    <section v-else class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Info :size="32" class="mb-4 text-zinc-500" />
      <h1 class="text-2xl font-semibold">Movie not found</h1>
      <RouterLink to="/home" class="mt-5 text-sm text-zinc-400 underline underline-offset-4 hover:text-white">Back to Home</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-grid :deep(a) {
  width: 100%;
}
</style>

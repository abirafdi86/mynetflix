<script setup lang="ts">
import { Info, Play } from '@lucide/vue'
import { useRouter } from 'vue-router'

import type { Movie } from '../../types/movie'
import BaseButton from '../common/BaseButton.vue'
import MovieImage from '../common/MovieImage.vue'

defineProps<{
  movie: Movie
}>()

const router = useRouter()

function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = String(duration % 60).padStart(2, '0')
  return `${hours}h ${minutes}m`
}

function playMovie(movieId: string): void {
  void router.push({ name: 'watch', params: { id: movieId } })
}

function showMovieDetails(movieId: string): void {
  void router.push({ name: 'movie-detail', params: { id: movieId } })
}
</script>

<template>
  <section
    class="relative flex min-h-[76svh] items-end overflow-hidden bg-zinc-900 pt-24 sm:min-h-[82svh]"
    :style="{ backgroundPosition: 'center', backgroundSize: 'cover' }"
  >
    <MovieImage :src="movie.backdrop" :alt="movie.title" :title="movie.title" type="backdrop" class="absolute inset-0" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/15" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/10 to-black/25" />

    <div class="relative z-10 w-full max-w-2xl px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
      <p class="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-300">Featured</p>
      <h1 class="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">{{ movie.title }}</h1>
      <div class="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
        <span>{{ movie.year }}</span>
        <span class="h-1 w-1 rounded-full bg-zinc-500" />
        <span>{{ movie.maturityRating }}</span>
        <span class="h-1 w-1 rounded-full bg-zinc-500" />
        <span>{{ formatDuration(movie.duration) }}</span>
      </div>
      <p class="mt-4 max-w-xl text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">{{ movie.description }}</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <BaseButton @click="playMovie(movie.id)"><Play :size="19" fill="currentColor" /> Play</BaseButton>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-500/75 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          @click="showMovieDetails(movie.id)"
        >
          <Info :size="19" /> More Info
        </button>
      </div>
    </div>
  </section>
</template>

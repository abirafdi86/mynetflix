<script setup lang="ts">
import { Info, Play } from '@lucide/vue'
import { useRouter } from 'vue-router'

import type { Movie } from '../../types/movie'
import BaseButton from '../common/BaseButton.vue'

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
    class="relative flex min-h-[72svh] items-end overflow-hidden bg-zinc-900 pt-20 sm:min-h-[82svh] sm:pt-24"
    :style="{ backgroundImage: `url(${movie.backdrop})`, backgroundPosition: 'center', backgroundSize: 'cover' }"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" aria-hidden="true" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-black/5 to-transparent" aria-hidden="true" />

    <div class="relative z-10 w-full max-w-2xl px-5 pb-11 sm:px-8 sm:pb-20 lg:px-12">
      <p class="mb-4 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-zinc-200 sm:text-xs">
        <span class="h-px w-7 bg-red-600" aria-hidden="true" />
        Featured
      </p>
      <h1 class="max-w-xl text-[2.7rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">{{ movie.title }}</h1>
      <div class="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
        <span>{{ movie.year }}</span>
        <span class="h-1 w-1 rounded-full bg-zinc-500" />
        <span>{{ movie.maturityRating }}</span>
        <span class="h-1 w-1 rounded-full bg-zinc-500" />
        <span>{{ formatDuration(movie.duration) }}</span>
      </div>
      <p class="mt-4 line-clamp-3 max-w-xl text-sm leading-6 text-zinc-200 sm:line-clamp-none sm:text-base sm:leading-7">{{ movie.description }}</p>
      <div class="mt-7 flex flex-wrap gap-3 sm:mt-8">
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

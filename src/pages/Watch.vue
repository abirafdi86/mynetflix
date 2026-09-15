<script setup lang="ts">
import { ArrowLeft, Info } from '@lucide/vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BrandIntro from '../components/player/BrandIntro.vue'
import { getMovieById } from '../data/movies'
import type { Movie } from '../types/movie'

const route = useRoute()
const playerState = ref<'intro' | 'video'>('intro')
const videoError = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)

const movie = computed<Movie | undefined>(() => {
  const routeId = route.params.id
  const movieId = Array.isArray(routeId) ? routeId[0] : routeId
  return movieId ? getMovieById(movieId) : undefined
})

async function showVideo(): Promise<void> {
  playerState.value = 'video'
  await nextTick()

  try {
    await videoElement.value?.play()
  } catch {
    // The native controls remain available if the browser blocks autoplay.
  }
}

function handleVideoError(): void {
  videoError.value = true
}

function resetPlayer(): void {
  playerState.value = 'intro'
  videoError.value = false
}

onMounted(resetPlayer)
onUnmounted(resetPlayer)
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-black px-4 py-20 text-white sm:px-8">
    <template v-if="movie">
      <BrandIntro v-if="playerState === 'intro'" @complete="showVideo" />
      <RouterLink
        :to="{ name: 'movie-detail', params: { id: movie.id } }"
        class="absolute left-4 top-4 z-10 inline-flex min-h-10 items-center gap-2 rounded-md bg-black/60 px-3 py-2 text-sm text-zinc-200 transition-colors duration-200 hover:bg-black/85 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8 sm:top-8"
      >
        <ArrowLeft :size="19" />
        <span>Back</span>
      </RouterLink>

      <video
        v-if="playerState === 'video' && !videoError"
        ref="videoElement"
        class="h-[100svh] w-screen object-contain"
        autoplay
        controls
        playsinline
        preload="metadata"
        :src="movie.videoUrl"
        :aria-label="`Watch ${movie.title}`"
        @error="handleVideoError"
      >
        Your browser does not support HTML5 video.
      </video>
      <section v-if="playerState === 'video' && videoError" class="max-w-md px-6 text-center">
        <Info :size="32" class="mx-auto mb-4 text-zinc-500" />
        <h1 class="text-xl font-semibold">Demo video belum tersedia.</h1>
        <p class="mt-3 text-sm leading-6 text-zinc-400">Tambahkan video ke public/movies/dummy.mp4</p>
      </section>
    </template>

    <section v-else class="flex flex-col items-center text-center">
      <Info :size="32" class="mb-4 text-zinc-500" />
      <h1 class="text-2xl font-semibold">Movie not found</h1>
      <RouterLink to="/home" class="mt-5 text-sm text-zinc-400 underline underline-offset-4 hover:text-white">Back to Home</RouterLink>
    </section>
  </main>
</template>

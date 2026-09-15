<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from 'vue'

import type { Movie } from '../../types/movie'
import BaseIconButton from '../common/BaseIconButton.vue'
import MovieCard from './MovieCard.vue'

defineProps<{
  title: string
  movies: Movie[]
}>()

const rowElement = ref<HTMLElement | null>(null)

function scrollRow(distance: number): void {
  rowElement.value?.scrollBy({ left: distance, behavior: 'smooth' })
}
</script>

<template>
  <section v-if="movies.length" class="group/row relative mt-8 sm:mt-12">
    <div class="mb-4 flex items-center justify-between px-5 sm:px-8 lg:px-12">
      <h2 class="text-lg font-semibold tracking-tight text-white sm:text-2xl">{{ title }}</h2>
      <div class="hidden items-center gap-1 opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex">
        <BaseIconButton :label="`Scroll ${title} left`" @click="scrollRow(-720)">
          <ChevronLeft :size="22" />
        </BaseIconButton>
        <BaseIconButton :label="`Scroll ${title} right`" @click="scrollRow(720)">
          <ChevronRight :size="22" />
        </BaseIconButton>
      </div>
    </div>

    <div ref="rowElement" class="movie-row flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 sm:px-8 lg:px-12">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style scoped>
.movie-row {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.movie-row::-webkit-scrollbar {
  display: none;
}
</style>

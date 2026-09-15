<script setup lang="ts">
import { RouterLink } from 'vue-router'

import MovieImage from '../common/MovieImage.vue'
import type { Movie } from '../../types/movie'

defineProps<{
  movie: Movie
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'movie-detail', params: { id: movie.id } }"
    class="group block w-[190px] shrink-0 rounded-sm outline-none sm:w-[240px] lg:w-[280px]"
  >
    <div class="aspect-video overflow-hidden rounded-sm bg-zinc-800 ring-1 ring-transparent transition-[transform,box-shadow] duration-300 group-focus-visible:ring-white">
      <MovieImage :src="movie.thumbnail" :alt="movie.title" :title="movie.title" type="thumbnail" class="transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105" />
    </div>
    <h3 class="mt-2 truncate text-sm font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white group-focus-visible:text-white sm:mt-3">
      {{ movie.title }}
    </h3>
  </RouterLink>
</template>

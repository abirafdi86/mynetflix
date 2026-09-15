<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt: string
  title: string
  type?: 'thumbnail' | 'backdrop' | 'avatar'
}>(), {
  type: 'thumbnail',
})

const hasError = ref(false)

function handleError(): void {
  hasError.value = true
}
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-900">
    <img v-if="!hasError" :src="props.src" :alt="props.alt" class="h-full w-full object-cover" loading="lazy" @error="handleError" />
    <div v-else class="absolute inset-0 flex items-center justify-center bg-zinc-900 px-4 text-center" :class="props.type === 'backdrop' ? 'bg-zinc-800' : 'bg-zinc-900'">
      <span class="max-w-full truncate text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">{{ props.title }}</span>
    </div>
  </div>
</template>

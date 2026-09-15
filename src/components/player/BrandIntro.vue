<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import BrandLogo from '../common/BrandLogo.vue'

const emit = defineEmits<{
  complete: []
}>()

let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timer = setTimeout(() => emit('complete'), 2800)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section class="brand-intro fixed inset-0 z-30 flex min-h-screen items-center justify-center bg-black" aria-label="Netflix intro">
    <div class="intro-logo"><BrandLogo size="lg" /></div>
    <button
      type="button"
      class="absolute bottom-7 right-5 border border-zinc-600 bg-black/50 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-9 sm:right-9"
      @click="emit('complete')"
    >
      Skip Intro
    </button>
  </section>
</template>

<style scoped>
.brand-intro {
  animation: intro-fade 500ms ease 2350ms forwards;
}

.intro-logo {
  animation: logo-arrival 2200ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}

@keyframes logo-arrival {
  0% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
  35% { opacity: 1; transform: scale(1); filter: blur(0); text-shadow: 0 0 32px rgba(229, 9, 20, 0.55); }
  75% { opacity: 1; transform: scale(1.02); }
  100% { opacity: 0; transform: scale(1.06); filter: blur(2px); }
}

@keyframes intro-fade {
  to { opacity: 0; visibility: hidden; }
}
</style>

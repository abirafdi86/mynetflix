<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})
</script>

<template>
  <span
    class="brand-logo select-none font-black uppercase leading-none text-red-600"
    :class="{
      'text-lg tracking-[0.16em]': size === 'sm',
      'text-2xl tracking-[0.18em]': size === 'md',
      'text-6xl tracking-[0.08em] sm:text-8xl': size === 'lg',
    }"
    aria-label="Netflix"
  >
    NETFLIX
  </span>
</template>

<style scoped>
.brand-logo {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transform: scaleX(0.88);
  transform-origin: left center;
}
</style>

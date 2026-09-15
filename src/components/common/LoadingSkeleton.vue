<script setup lang="ts">
interface Props {
  height?: string
  width?: string
  rounded?: string
}

withDefaults(defineProps<Props>(), {
  height: 'h-4',
  width: 'w-full',
  rounded: 'rounded-md',
})
</script>

<template>
  <div
    aria-hidden="true"
    class="animate-pulse bg-zinc-800/80"
    :class="[height, width, rounded]"
  />
</template>

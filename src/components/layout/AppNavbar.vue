<script setup lang="ts">
import { Menu, Search, X } from '@lucide/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import BaseIconButton from '../common/BaseIconButton.vue'
import BrandLogo from '../common/BrandLogo.vue'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const isMinimalPage = computed(() => route.name === 'profiles' || route.name === 'watch')

function updateScrollState(): void {
  isScrolled.value = window.scrollY > 16
}

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<template>
  <header
    v-if="!isMinimalPage"
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300"
    :class="isScrolled || isMobileMenuOpen ? 'bg-[#141414]/95 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'"
  >
    <div class="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
      <RouterLink to="/home" class="transition-opacity hover:opacity-80" @click="closeMobileMenu">
        <BrandLogo size="sm" />
      </RouterLink>

      <nav class="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex" aria-label="Primary navigation">
        <RouterLink to="/home" class="transition-colors hover:text-white" active-class="text-white">Home</RouterLink>
        <RouterLink to="/home" class="transition-colors hover:text-white" active-class="text-white">Movies</RouterLink>
        <RouterLink to="/my-list" class="transition-colors hover:text-white" active-class="text-white">My List</RouterLink>
      </nav>

      <div class="flex items-center gap-1">
        <RouterLink to="/search">
          <BaseIconButton label="Search"><Search :size="20" stroke-width="1.8" /></BaseIconButton>
        </RouterLink>
        <RouterLink to="/profiles" class="hidden sm:block" aria-label="Switch profile">
          <span class="flex size-8 items-center justify-center rounded-md bg-red-700 text-xs font-bold text-white">S</span>
        </RouterLink>
        <BaseIconButton class="md:hidden" :label="isMobileMenuOpen ? 'Close menu' : 'Open menu'" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <X v-if="isMobileMenuOpen" :size="21" />
          <Menu v-else :size="21" />
        </BaseIconButton>
      </div>
    </div>

    <nav v-if="isMobileMenuOpen" class="border-t border-white/10 px-5 pb-5 pt-3 md:hidden" aria-label="Mobile navigation">
      <RouterLink to="/home" class="block py-2.5 text-sm text-zinc-300 transition-colors hover:text-white" @click="closeMobileMenu">Home</RouterLink>
      <RouterLink to="/home" class="block py-2.5 text-sm text-zinc-300 transition-colors hover:text-white" @click="closeMobileMenu">Movies</RouterLink>
      <RouterLink to="/my-list" class="block py-2.5 text-sm text-zinc-300 transition-colors hover:text-white" @click="closeMobileMenu">My List</RouterLink>
      <RouterLink to="/profiles" class="block py-2.5 text-sm text-zinc-300 transition-colors hover:text-white" @click="closeMobileMenu">Switch profile</RouterLink>
    </nav>
  </header>
</template>

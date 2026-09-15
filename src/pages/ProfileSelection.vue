<script setup lang="ts">
import { UserRound } from '@lucide/vue'
import { useRouter } from 'vue-router'

import { profiles } from '../data/profiles'
import BrandLogo from '../components/common/BrandLogo.vue'
import { useProfileStore } from '../stores/profile'
import type { Profile } from '../types/profile'

const router = useRouter()
const profileStore = useProfileStore()

function chooseProfile(profile: Profile): void {
  profileStore.selectProfile(profile)
  void router.push({ name: 'home' })
}

function handleAvatarError(event: Event): void {
  const image = event.currentTarget as HTMLImageElement
  image.hidden = true
  image.nextElementSibling?.removeAttribute('hidden')
}
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-5 py-12 text-center text-white sm:px-8">
    <section class="w-full max-w-3xl">
      <BrandLogo size="sm" />
      <h1 class="text-3xl font-medium tracking-tight sm:text-5xl">Who's watching?</h1>

      <div class="mt-10 flex flex-wrap justify-center gap-5 sm:mt-14 sm:gap-10">
        <button
          v-for="profile in profiles"
          :key="profile.id"
          type="button"
          class="group flex w-28 flex-col items-center gap-3 text-zinc-400 transition-transform duration-200 hover:scale-[1.04] hover:text-white focus-visible:scale-[1.04] focus-visible:text-white focus-visible:outline-none sm:w-36"
          @click="chooseProfile(profile)"
        >
          <span class="relative flex aspect-square w-24 items-center justify-center overflow-hidden rounded-sm border-2 border-transparent bg-zinc-800 transition-colors duration-200 group-hover:border-white group-focus-visible:border-white sm:w-32">
            <img :src="profile.avatar" :alt="`${profile.name} profile`" class="h-full w-full object-cover" @error="handleAvatarError" />
            <span hidden class="absolute inset-0 items-center justify-center bg-zinc-800 text-zinc-500">
              <UserRound :size="42" stroke-width="1.4" />
            </span>
          </span>
          <span class="text-base font-medium sm:text-lg">{{ profile.name }}</span>
        </button>
      </div>

      <button
        type="button"
        class="mt-14 border border-zinc-600 px-5 py-2 text-sm uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-200 hover:border-white hover:text-white focus-visible:border-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Manage Profiles
      </button>
    </section>
  </main>
</template>

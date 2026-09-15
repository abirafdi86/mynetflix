import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Profile } from '../types/profile'

export const useAppStore = defineStore('app', () => {
  const activeProfile = ref<Profile | null>(null)

  function setActiveProfile(profile: Profile): void {
    activeProfile.value = profile
  }

  return { activeProfile, setActiveProfile }
})

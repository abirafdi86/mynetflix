import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Profile } from '../types/profile'

const STORAGE_KEY = 'stream-selected-profile'

export const useProfileStore = defineStore('profile', () => {
  const selectedProfile = ref<Profile | null>(null)

  function hydrate(): void {
    const storedProfile = localStorage.getItem(STORAGE_KEY)
    if (!storedProfile) return

    try {
      selectedProfile.value = JSON.parse(storedProfile) as Profile
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function selectProfile(profile: Profile): void {
    selectedProfile.value = profile
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }

  return { selectedProfile, hydrate, selectProfile }
})
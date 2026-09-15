import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'stream-my-list'

export const useMyListStore = defineStore('my-list', () => {
  const movieIds = ref<string[]>([])

  function hydrate(): void {
    const storedIds = localStorage.getItem(STORAGE_KEY)
    if (!storedIds) return

    try {
      const parsedIds: unknown = JSON.parse(storedIds)
      if (Array.isArray(parsedIds) && parsedIds.every((id): id is string => typeof id === 'string')) {
        movieIds.value = parsedIds
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movieIds.value))
  }

  function isInMyList(movieId: string): boolean {
    return movieIds.value.includes(movieId)
  }

  function toggleMovie(movieId: string): void {
    movieIds.value = isInMyList(movieId)
      ? movieIds.value.filter((id) => id !== movieId)
      : [...movieIds.value, movieId]
    persist()
  }

  return { movieIds, hydrate, isInMyList, toggleMovie }
})
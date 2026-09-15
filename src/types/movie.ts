export interface Movie {
  id: string
  title: string
  description: string
  year: number
  duration: number
  maturityRating: string
  genres: string[]
  thumbnail: string
  backdrop: string
  videoUrl: string
  featured?: boolean
  trending?: boolean
}

import { createRouter, createWebHistory } from 'vue-router'
import { useProfileStore } from '../stores/profile'

import Home from '../pages/Home.vue'
import MovieDetail from '../pages/MovieDetail.vue'
import MyList from '../pages/MyList.vue'
import NotFound from '../pages/NotFound.vue'
import ProfileSelection from '../pages/ProfileSelection.vue'
import Search from '../pages/Search.vue'
import Watch from '../pages/Watch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/profiles', name: 'profiles', component: ProfileSelection },
    { path: '/home', name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search },
    { path: '/my-list', name: 'my-list', component: MyList },
    { path: '/movie/:id', name: 'movie-detail', component: MovieDetail },
    { path: '/watch/:id', name: 'watch', component: Watch },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
})

router.beforeEach((to) => {
  const profileStore = useProfileStore()
  profileStore.hydrate()

  if (to.path === '/') {
    return profileStore.selectedProfile ? '/home' : '/profiles'
  }

  if (!profileStore.selectedProfile && to.name !== 'profiles') {
    return '/profiles'
  }

  return undefined
})

export default router

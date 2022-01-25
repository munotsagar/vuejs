import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import TopAlbums from "@/views/TopAlbums/index.vue";
import TopAlbumsView from "@/views/TopAlbums/view.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/topalbums",
    name: "TopAlbums",
    component: TopAlbums,
  },
  {
    path: "/topalbums/:id",
    name: "TopAlbumsView",
    component: TopAlbumsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

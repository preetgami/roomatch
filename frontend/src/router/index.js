import { createRouter, createWebHistory } from "vue-router";
import store from "../store"; // Assuming your Vuex store is in '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => import("../views/LogInView.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/match",
      name: "Match",
      component: () => import("../views/MatchView.vue"),
    },
    {
      path: "/yourmatch",
      name: "Matched",
      component: () => import("../views/MatchedView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  await store.dispatch("fetchUser");
  const user = await store.getters.getUser?.user?.uid;

  if (
    !user &&
    to.name !== "LogIn" &&
    to.name !== "home" &&
    to.name !== "signUp"
  ) {
    next({ name: "LogIn" });
  } else {
    next();
  }
});
export default router;

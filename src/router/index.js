import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Browse from "@/views/Browse.vue";
import MyList from "@/views/MyList.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import AdminMovieManagement from "@/views/AdminMovieManagement.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import { adminGuard } from '@/utils/adminGuard';

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
    props: true,
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/browse", name: "Browse", component: Browse },
  { path: "/my-list", name: "MyList", component: MyList },
  { 
    path: "/admin/login", 
    redirect: "/login"
  },
  { 
    path: "/admin/dashboard", 
    name: "AdminDashboard", 
    component: AdminDashboard,
    beforeEnter: adminGuard
  },
  { 
    path: "/admin/movies", 
    name: "AdminMovieManagement", 
    component: AdminMovieManagement,
    beforeEnter: adminGuard
  },
  { 
    path: "/admin/users", 
    name: "AdminUsers", 
    component: AdminUsers,
    beforeEnter: adminGuard
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

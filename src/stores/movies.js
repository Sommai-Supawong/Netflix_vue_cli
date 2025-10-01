import { defineStore } from "pinia";
import api from "@/api";

export const useMoviesStore = defineStore("movies", {
  state: () => ({ list: [], loading: false }),
  actions: {
    async fetchMovies(params = {}) {
      this.loading = true;
      try {
        const res = await api.get("/movies", { params });
        this.list = res.data;
      } finally {
        this.loading = false;
      }
    },
  },
});

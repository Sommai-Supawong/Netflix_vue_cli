<template>
  <div class="movie-card" @click="goToMovieDetail">
    <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-description">{{ movie.description }}</p>
      <div class="movie-rating">
        <span class="rating">★ {{ movie.rating }}</span>
      </div>
      <button class="watch-btn" @click.stop="watchNow">Watch Now</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToMovieDetail() {
      this.$router.push(`/movie/${this.movie.id}`);
    },
    watchNow() {
      // In a real app, this would open a video player
      console.log(`Watching ${this.movie.title}`);
      this.$router.push(`/movie/${this.movie.id}`);
    }
  }
}
</script>

<style scoped>
.movie-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background: #181818;
  height: 300px;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5);
}

.movie-poster {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.movie-info {
  padding: 12px;
}

.movie-title {
  color: white;
  font-size: 1rem;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-description {
  color: #b3b3b3;
  font-size: 0.8rem;
  margin: 0 0 8px 0;
  height: 40px;
  overflow: hidden;
}

.movie-rating {
  margin-bottom: 10px;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.watch-btn {
  width: 100%;
  padding: 8px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.watch-btn:hover {
  background-color: #f40612;
}
</style>
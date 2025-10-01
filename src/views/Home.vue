<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Netflix Clone</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <div class="hero-buttons">
          <button class="btn btn-primary">Watch Now</button>
          <button class="btn btn-secondary">My List</button>
        </div>
      </div>
    </section>

    <section class="featured-movies">
      <h2>Featured Movies</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in featuredMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </section>

    <section class="trending-movies">
      <h2>Trending Now</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in trendingMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Home',
  components: {
    MovieCard
  },
  data() {
    return {
      featuredMovies: [
        { id: 1, title: 'Action Hero', poster: 'https://via.placeholder.com/300x450', description: 'An action-packed adventure', rating: 8.5 },
        { id: 2, title: 'Comedy Central', poster: 'https://via.placeholder.com/300x450', description: 'Hilarious comedy hits', rating: 7.8 },
        { id: 3, title: 'Sci-Fi World', poster: 'https://via.placeholder.com/300x450', description: 'Mind-bending science fiction', rating: 9.0 },
        { id: 4, title: 'Horror House', poster: 'https://via.placeholder.com/300x450', description: 'Scary and suspenseful', rating: 7.2 }
      ],
      trendingMovies: [
        { id: 5, title: 'Drama Queen', poster: 'https://via.placeholder.com/300x450', description: 'Emotional drama series', rating: 8.9 },
        { id: 6, title: 'Romance Story', poster: 'https://via.placeholder.com/300x450', description: 'Heartwarming romantic tale', rating: 8.1 },
        { id: 7, title: 'Documentary Zone', poster: 'https://via.placeholder.com/300x450', description: 'Educational and inspiring', rating: 9.2 },
        { id: 8, title: 'Animation Land', poster: 'https://via.placeholder.com/300x450', description: 'Colorful animated adventures', rating: 8.7 }
      ]
    }
  },
  created() {
    document.title = 'Netflix Clone - Home';
  }
}
</script>

<style scoped>
.home {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
               url('https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Background+Image') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding-bottom: 40px;
}

.hero {
  padding: 100px 20px 40px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background-color: #e50914;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: none;
}

section {
  margin: 40px 0;
  padding: 0 20px;
}

h2 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-left: 10px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
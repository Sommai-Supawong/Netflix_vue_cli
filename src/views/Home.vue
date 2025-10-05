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
import { useMoviesStore } from '@/stores/movies';
import { mapState } from 'pinia';
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'HomePage',
  components: {
    MovieCard
  },
  computed: {
    ...mapState(useMoviesStore, ['list', 'loading']),
    featuredMovies() {
      // Return first 4 movies as featured
      return this.list.slice(0, 4);
    },
    trendingMovies() {
      // Return next 4 movies as trending
      return this.list.slice(4, 8);
    }
  },
  async created() {
    document.title = 'Netflix Clone - Home';
    
    // Initialize movies from localStorage
    const moviesStore = useMoviesStore();
    moviesStore.initializeMovies();
  }
}
</script>

<style scoped>
.home {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%), 
               url('https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e90-bf5d-7c3e43e2f8a9/3c8bf3c6-2a0d-4605-97b1-648e1ae6c53c/TH-en-20251003-popsignuptwoweeks-perspective_alpha_website_large.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  padding-bottom: 2.5rem;
  position: relative;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(229, 9, 20, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: -1;
}

.hero {
  padding: 8rem 1.25rem 2.5rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(229, 9, 20, 0.1) 0%, transparent 70%);
  z-index: -1;
}

.hero-content {
  max-width: 65rem;
  margin: 0 auto;
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
}

.hero h1 {
  font-size: 4.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  background: linear-gradient(to right, #e50914, #ff4757);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  font-weight: 800;
}

.hero p {
  font-size: 1.75rem;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
  color: #f5f5f5;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.btn {
  padding: 0.9rem 2rem;
  border-radius: 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.btn-primary {
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
}

.btn-secondary {
  background: linear-gradient(145deg, rgba(109, 109, 110, 0.8), rgba(50, 50, 50, 0.8));
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(145deg, rgba(50, 50, 50, 0.9), rgba(109, 109, 110, 0.9));
}

section {
  margin: 4rem 0;
  padding: 0 1.25rem;
}

h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  padding-left: 0.625rem;
  position: relative;
  font-weight: 700;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -0.3rem;
  left: 0;
  width: 4rem;
  height: 0.25rem;
  background: linear-gradient(to right, #e50914, #ff4757);
  border-radius: 0.25rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;
}

/* Animation for hero content */
.hero-content {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation for buttons */
.hero-buttons .btn {
  animation: btnPulse 2s infinite;
}

@keyframes btnPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Adjust animation on hover */
.hero-buttons .btn:hover {
  animation: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero {
    padding: 6rem 1rem 2rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.25rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 20rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
    gap: 1rem;
  }
}
</style>
<template>
  <div class="movie-detail" v-if="selectedMovie">
    <div class="hero" :style="{ backgroundImage: `url(${selectedMovie.background || 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Background+Image'})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>{{ selectedMovie.title }}</h1>
        <div class="movie-meta">
          <span class="rating">★ {{ selectedMovie.rating }}</span>
          <span class="year">{{ selectedMovie.year || 'N/A' }}</span>
          <span class="duration">{{ selectedMovie.duration || 'N/A' }}</span>
        </div>
        <p class="description">{{ selectedMovie.description }}</p>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="playMovie">
            <i class="play-icon">▶</i> Play
          </button>
          <button class="btn btn-secondary" @click="toggleMyList">
            {{ isInMyList ? '-' : '+' }} My List
          </button>
        </div>
      </div>
    </div>

    <div class="movie-info">
      <div class="container">
        <div class="cast">
          <h3>Cast</h3>
          <p>{{ selectedMovie.cast?.join(', ') || 'N/A' }}</p>
        </div>
        <div class="genre">
          <h3>Genre</h3>
          <p>{{ selectedMovie.genre?.join(', ') || 'N/A' }}</p>
        </div>
        <div class="director">
          <h3>Director</h3>
          <p>{{ selectedMovie.director || 'N/A' }}</p>
        </div>
      </div>
    </div>
    <CustomAlert ref="customAlert" />
  </div>
  <div v-else class="loading">
    <p>Loading movie details...</p>
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';
import { useUserFavoritesStore } from '@/stores/userFavorites';
import { mapState } from 'pinia';

export default {
  name: 'MovieDetail',
  data() {
    return {
      isInMyList: false
    }
  },
  computed: {
    ...mapState(useMoviesStore, ['list']),
    selectedMovie() {
      const movieId = parseInt(this.$route.params.id);
      // Find the movie in the store by ID
      return this.list.find(movie => movie.id === movieId);
    }
  },
  created() {
    this.fetchMovieDetails();
    this.checkMyList();
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    fetchMovieDetails() {
      // Initialize movies from localStorage to ensure we have the latest data
      const moviesStore = useMoviesStore();
      
      // Initialize movies from localStorage
      moviesStore.initializeMovies();
    },
    playMovie() {
      // Check if the movie has a video link
      if (this.selectedMovie && this.selectedMovie.videoLink) {
        // Open the video link in a new tab/window
        window.open(this.selectedMovie.videoLink, '_blank');
      } else {
        // Fallback if no video link is available
        this.showCustomAlert('ไม่พบลิงค์วิดีโอสำหรับหนังเรื่องนี้', 'warning');
      }
    },
    async toggleMyList() {
      if (!this.selectedMovie) return;
      
      const favoritesStore = useUserFavoritesStore();
      try {
        // Toggle the favorite status
        this.isInMyList = await favoritesStore.toggleFavorite(this.selectedMovie.id.toString());
        const message = this.isInMyList ? 'added to' : 'removed from';
        this.showCustomAlert(`${this.selectedMovie.title} ${message} your list`, 'info');
      } catch (error) {
        this.showCustomAlert('Error updating your list', 'error');
        console.error('Error toggling favorite:', error);
      }
    },
    checkMyList() {
      const favoritesStore = useUserFavoritesStore();
      // Initialize if needed
      if (favoritesStore.favoriteMovies.length === 0) {
        favoritesStore.initializeFavorites();
      }
      this.isInMyList = favoritesStore.isFavorite(this.$route.params.id);
    }
  },
  watch: {
    // Watch for route changes to fetch new movie details if needed
    '$route.params.id'() {
      this.fetchMovieDetails();
    }
  }
}
</script>

<style scoped>
.movie-detail {
  background-color: #181818;
  min-height: 100vh;
  color: white;
}

.hero {
  height: 80vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #181818, transparent 60%);
}

.hero-content {
  padding: 0 60px 80px;
  max-width: 800px;
  z-index: 1;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 15px;
}

.movie-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.description {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 30px;
  max-width: 700px;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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

.btn:hover {
  opacity: 0.8;
}

.play-icon {
  font-size: 0.9rem;
}

.movie-info {
  padding: 40px 60px;
}

.container {
  max-width: 800px;
}

.movie-info h3 {
  color: #b3b3b3;
  font-size: 1rem;
  margin-bottom: 8px;
}

.movie-info p {
  font-size: 1.1rem;
  margin-bottom: 25px;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-content {
    padding: 0 20px 40px;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .movie-info {
    padding: 30px 20px;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 1.5rem;
}
</style>
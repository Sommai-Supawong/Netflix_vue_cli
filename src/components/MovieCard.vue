<template>
  <div class="movie-card">
    <img :src="movie.poster" :alt="movie.title" class="movie-poster" loading="lazy" />
    <div class="movie-overlay">
      <div class="movie-actions">
        <button class="action-btn watch-btn" @click.stop="watchNow">
          <i class="play-icon">▶</i> Watch
        </button>
        <button 
          class="action-btn favorite-btn" 
          :class="{ 'favorited': isFavorite }"
          @click.stop="toggleFavorite"
        >
          {{ isFavorite ? '−' : '+' }} My List
        </button>
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-description">{{ movie.description }}</p>
      <div class="movie-rating">
        <span class="rating">★ {{ movie.rating }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserFavoritesStore } from '@/stores/userFavorites';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false
    }
  },
  mounted() {
    const favoritesStore = useUserFavoritesStore();
    favoritesStore.initializeFavorites().catch(error => {
      console.error('Error initializing favorites in MovieCard:', error);
    });
    this.isFavorite = favoritesStore.isFavorite(this.movie.id.toString());
  },
  methods: {
    goToMovieDetail() {
      this.$router.push(`/movie/${this.movie.id}`);
    },
    watchNow() {
      // Check if the movie has a video link
      if (this.movie && this.movie.videoLink) {
        // Open the video link in a new tab/window
        window.open(this.movie.videoLink, '_blank');
      } else {
        // If no video link, go to movie detail page
        this.$router.push(`/movie/${this.movie.id}`);
      }
    },
    async toggleFavorite() {
      try {
        const favoritesStore = useUserFavoritesStore();
        await favoritesStore.toggleFavorite(this.movie.id.toString());
        this.isFavorite = favoritesStore.isFavorite(this.movie.id.toString());
        
        // Emit event to parent component if needed
        this.$emit('favorite-changed', {
          movieId: this.movie.id,
          isFavorite: this.isFavorite
        });
      } catch (error) {
        console.error('Error toggling favorite:', error);
        // Show user-friendly message if needed
        alert('There was an issue updating your favorites list. Changes have been saved locally and will sync when connection is restored.');
      }
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

.movie-card:hover .movie-overlay {
  opacity: 1;
  visibility: visible;
}

.movie-poster {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 10;
}

.movie-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: background-color 0.3s ease;
  min-width: 120px;
}

.watch-btn {
  background-color: rgba(229, 9, 20, 0.85);
  color: white;
}

.watch-btn:hover {
  background-color: rgba(229, 9, 20, 1);
}

.favorite-btn {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
}

.favorite-btn:hover {
  background-color: rgba(109, 109, 110, 0.9);
}

.favorite-btn.favorited {
  background-color: rgba(229, 9, 20, 0.85);
}

.movie-info {
  padding: 12px;
  position: relative;
  z-index: 5;
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

.play-icon {
  font-size: 0.8rem;
}
</style>
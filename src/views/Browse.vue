<template>
  <div class="browse">
    <h1>Browse Movies</h1>
    
    <!-- Show categories in a horizontal scroll if needed -->
    <div class="genre-navigation">
      <div class="genre-list">
        <button 
          v-for="(movies, genre) in categorizedMovies" 
          :key="genre" 
          class="genre-btn"
          @click="scrollToGenre(genre)"
        >
          {{ formatGenreName(genre) }}
        </button>
      </div>
    </div>

    <div v-for="(movies, genre) in categorizedMovies" :key="genre" class="category-section" :id="`genre-${genre}`">
      <h2>{{ formatGenreName(genre) }}</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';
import { mapState } from 'pinia';
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'BrowseMovies',
  components: {
    MovieCard
  },
  computed: {
    ...mapState(useMoviesStore, ['list', 'loading']),
    categorizedMovies() {
      const categories = {};
      
      // Group movies by genre
      this.list.forEach(movie => {
        const genre = movie.genre || 'other';
        if (!categories[genre]) {
          categories[genre] = [];
        }
        categories[genre].push(movie);
      });
      
      return categories;
    }
  },
  methods: {
    formatGenreName(genre) {
      // Format genre names for display
      const genreNames = {
        'action': 'Action & Adventure',
        'adventure': 'Action & Adventure',
        'comedy': 'Comedy',
        'drama': 'Drama',
        'horror': 'Horror',
        'sci-fi': 'Sci-Fi & Fantasy',
        'fantasy': 'Sci-Fi & Fantasy',
        'romance': 'Romance',
        'thriller': 'Thriller',
        'animation': 'Animation',
        'documentary': 'Documentary',
        'other': 'Other'
      };
      
      return genreNames[genre.toLowerCase()] || genre.charAt(0).toUpperCase() + genre.slice(1);
    },
    scrollToGenre(genre) {
      const element = document.getElementById(`genre-${genre}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  },
  async created() {
    document.title = 'Netflix Clone - Browse';
    
    // Initialize movies from localStorage
    const moviesStore = useMoviesStore();
    moviesStore.initializeMovies();
  }
}
</script>

<style scoped>
.browse {
  background: linear-gradient(135deg, #0f0f0f 0%, #181818 100%);
  color: white;
  padding: 6rem 1.875rem 2.5rem;
  min-height: 100vh;
  position: relative;
}

.browse::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(229, 9, 20, 0.05) 0%, transparent 70%);
  z-index: -1;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  padding-left: 0.625rem;
  background: linear-gradient(to right, #e50914, #ff4757);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

h1::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 4rem;
  height: 0.25rem;
  background: linear-gradient(to right, #e50914, #ff4757);
  border-radius: 0.25rem;
}

.genre-navigation {
  position: sticky;
  top: 4rem;
  background: rgba(15, 15, 15, 0.95);
  padding: 1rem 0;
  margin-bottom: 2.5rem;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.genre-list {
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #e50914 transparent;
}

.genre-list::-webkit-scrollbar {
  height: 6px;
}

.genre-list::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 3px;
}

.genre-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.genre-btn:hover {
  background: rgba(229, 9, 20, 0.3);
  border-color: #e50914;
  transform: translateY(-2px);
}

.genre-btn:active {
  transform: translateY(0);
}

.category-section {
  margin-bottom: 3.5rem;
  animation: slideIn 0.8s ease-out;
}

.category-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-left: 0.625rem;
  color: #ffffff;
  position: relative;
  font-weight: 700;
}

.category-section h2::after {
  content: '';
  position: absolute;
  bottom: -0.3rem;
  left: 0;
  width: 3rem;
  height: 0.2rem;
  background: linear-gradient(to right, #e50914, #ff4757);
  border-radius: 0.1rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;
}

/* Animation for sections */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation for movie cards */
.movie-grid > * {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .browse {
    padding: 6rem 1rem 2rem;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .genre-navigation {
    top: 3.5rem;
  }
  
  .genre-list {
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
  
  .genre-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
  
  .category-section {
    margin-bottom: 2.5rem;
  }
  
  .category-section h2 {
    font-size: 1.5rem;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .browse {
    padding: 5rem 0.75rem 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
    text-align: center;
  }
  
  .genre-navigation {
    top: 3rem;
  }
  
  .genre-btn {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
  }
  
  .category-section h2 {
    font-size: 1.25rem;
    text-align: center;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 0.75rem;
    padding: 0 0.25rem;
  }
}
</style>
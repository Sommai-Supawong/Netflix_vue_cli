<template>
  <div class="my-list">
    <h1>My List</h1>
    
    <div v-if="myList.length === 0" class="empty-list">
      <p>You haven't added any movies to your list yet.</p>
      <router-link to="/" class="btn btn-primary">Browse Movies</router-link>
    </div>
    
    <div v-else class="movie-grid">
      <MovieCard 
        v-for="movie in myList" 
        :key="movie.id" 
        :movie="movie" 
      />
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';
import { useUserFavoritesStore } from '@/stores/userFavorites';
import { mapState } from 'pinia';
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MyList',
  components: {
    MovieCard
  },
  computed: {
    ...mapState(useMoviesStore, ['list', 'loading']),
    myList() {
      const favoritesStore = useUserFavoritesStore();
      // Get the IDs of movies in the user's list from the store
      const favoriteMovieIds = favoritesStore.favoriteMovies;
      
      // Find the full movie objects for those IDs from the store
      return this.list.filter(movie => favoriteMovieIds.includes(movie.id.toString()));
    }
  },
  created() {
    document.title = 'Netflix Clone - My List';
    
    // Initialize movies from localStorage
    const moviesStore = useMoviesStore();
    moviesStore.initializeMovies();
    
    // Initialize user favorites
    const favoritesStore = useUserFavoritesStore();
    favoritesStore.initializeFavorites();
  },
  watch: {
    // Watch for changes to localStorage and update the list accordingly
    '$route'() {
      // No need to do anything here as computed property will automatically update
    }
  }
}
</script>

<style scoped>
.my-list {
  background: linear-gradient(135deg, #0f0f0f 0%, #181818 100%);
  color: white;
  padding: 6rem 1.875rem 2.5rem;
  min-height: 100vh;
  position: relative;
}

.my-list::before {
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
  margin-bottom: 2.5rem;
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

.empty-list {
  text-align: center;
  padding: 4rem 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-list p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #b3b3b3;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1.5rem;
  padding: 0 0.5rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 3rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  border: none;
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

/* Responsive design */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .my-list {
    padding: 6rem 1rem 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1rem;
  }
  
  .empty-list {
    padding: 3rem 15px;
  }
  
  .empty-list p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .my-list {
    padding: 5rem 0.75rem 1.5rem;
  }
  
  h1 {
    font-size: 1.75rem;
    text-align: center;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 0.75rem;
    padding: 0 0.25rem;
  }
  
  .btn {
    width: 100%;
    max-width: 20rem;
  }
}
</style>
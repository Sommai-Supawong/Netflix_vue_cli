<template>
  <div class="browse">
    <h1>Browse Movies</h1>
    
    <div class="category-section">
      <h2>Action & Adventure</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in actionMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
    
    <div class="category-section">
      <h2>Comedy</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in comedyMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
    
    <div class="category-section">
      <h2>Drama</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in dramaMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
    
    <div class="category-section">
      <h2>Horror</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in horrorMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
    
    <div class="category-section">
      <h2>Sci-Fi & Fantasy</h2>
      <div class="movie-grid">
        <MovieCard 
          v-for="movie in sciFiMovies" 
          :key="movie.id" 
          :movie="movie" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Browse',
  components: {
    MovieCard
  },
  data() {
    return {
      actionMovies: [
        { id: 1, title: 'Action Hero', poster: 'https://via.placeholder.com/300x450/ff6b6b/ffffff?text=Action', description: 'An action-packed adventure', rating: 8.5 },
        { id: 5, title: 'Fast Cars', poster: 'https://via.placeholder.com/300x450/4ecdc4/ffffff?text=Fast+Cars', description: 'High-speed racing action', rating: 7.9 },
        { id: 9, title: 'Superhero Battle', poster: 'https://via.placeholder.com/300x450/45b7d1/ffffff?text=Superhero', description: 'Heroes fight evil', rating: 8.2 },
        { id: 13, title: 'Martial Arts', poster: 'https://via.placeholder.com/300x450/f9ca24/ffffff?text=Martial+Arts', description: 'Intense fighting sequences', rating: 8.0 }
      ],
      comedyMovies: [
        { id: 2, title: 'Comedy Central', poster: 'https://via.placeholder.com/300x450/f0932b/ffffff?text=Comedy', description: 'Hilarious comedy hits', rating: 7.8 },
        { id: 6, title: 'Funny Times', poster: 'https://via.placeholder.com/300x450/eb4d4b/ffffff?text=Funny', description: 'Laugh until your sides hurt', rating: 7.5 },
        { id: 10, title: 'Silly Adventures', poster: 'https://via.placeholder.com/300x450/6ab04c/ffffff?text=Silly', description: 'Goofy adventures', rating: 7.3 },
        { id: 14, title: 'Joke Master', poster: 'https://via.placeholder.com/300x450/30336b/ffffff?text=Jokes', description: 'The best comedians', rating: 7.7 }
      ],
      dramaMovies: [
        { id: 7, title: 'Deep Emotions', poster: 'https://via.placeholder.com/300x450/6c5ce7/ffffff?text=Drama', description: 'Emotional drama series', rating: 8.9 },
        { id: 11, title: 'Family Matters', poster: 'https://via.placeholder.com/300x450/a55eea/ffffff?text=Family', description: 'Family relationships', rating: 8.4 },
        { id: 15, title: 'Historical Events', poster: 'https://via.placeholder.com/300x450/26de81/ffffff?text=History', description: 'Based on real events', rating: 8.8 },
        { id: 19, title: 'Romance Story', poster: 'https://via.placeholder.com/300x450/fd79a8/ffffff?text=Romance', description: 'Heartwarming romance', rating: 8.1 }
      ],
      horrorMovies: [
        { id: 4, title: 'Horror House', poster: 'https://via.placeholder.com/300x450/ff4757/ffffff?text=Horror', description: 'Scary and suspenseful', rating: 7.2 },
        { id: 8, title: 'Scary Night', poster: 'https://via.placeholder.com/300x450/3742fa/ffffff?text=Scary', description: 'Fear-inducing thriller', rating: 7.6 },
        { id: 12, title: 'Monster Attack', poster: 'https://via.placeholder.com/300x450/2ed573/ffffff?text=Monster', description: 'Creatures on the loose', rating: 7.4 },
        { id: 16, title: 'Ghost Town', poster: 'https://via.placeholder.com/300x450/ffa502/ffffff?text=Ghost', description: 'Supernatural scares', rating: 7.1 }
      ],
      sciFiMovies: [
        { id: 3, title: 'Sci-Fi World', poster: 'https://via.placeholder.com/300x450/1e90ff/ffffff?text=Sci-Fi', description: 'Mind-bending science fiction', rating: 9.0 },
        { id: 17, title: 'Space Adventure', poster: 'https://via.placeholder.com/300x450/3742fa/ffffff?text=Space', description: 'Journey to the stars', rating: 8.7 },
        { id: 18, title: 'Future Tech', poster: 'https://via.placeholder.com/300x450/2ed573/ffffff?text=Future', description: 'Technology of tomorrow', rating: 8.3 },
        { id: 20, title: 'Alien Invasion', poster: 'https://via.placeholder.com/300x450/ff6b6b/ffffff?text=Aliens', description: 'Extraterrestrial encounter', rating: 8.0 }
      ]
    }
  },
  created() {
    document.title = 'Netflix Clone - Browse';
  }
}
</script>

<style scoped>
.browse {
  background-color: #181818;
  color: white;
  padding: 100px 30px 40px;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  padding-left: 10px;
}

.category-section {
  margin-bottom: 40px;
}

.category-section h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-left: 10px;
  color: #ffffff;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .browse {
    padding: 100px 15px 40px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .category-section h2 {
    font-size: 1.5rem;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
</style>
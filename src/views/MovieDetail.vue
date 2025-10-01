<template>
  <div class="movie-detail">
    <div class="hero" :style="{ backgroundImage: `url(${selectedMovie.background})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>{{ selectedMovie.title }}</h1>
        <div class="movie-meta">
          <span class="rating">★ {{ selectedMovie.rating }}</span>
          <span class="year">{{ selectedMovie.year }}</span>
          <span class="duration">{{ selectedMovie.duration }}</span>
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
          <p>{{ selectedMovie.cast.join(', ') }}</p>
        </div>
        <div class="genre">
          <h3>Genre</h3>
          <p>{{ selectedMovie.genre.join(', ') }}</p>
        </div>
        <div class="director">
          <h3>Director</h3>
          <p>{{ selectedMovie.director }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data() {
    return {
      selectedMovie: null,
      isInMyList: false
    }
  },
  created() {
    this.fetchMovieDetails();
    this.checkMyList();
  },
  methods: {
    fetchMovieDetails() {
      // In a real app, this would fetch from an API
      const movieId = parseInt(this.$route.params.id);
      
      // Mock data for movie details
      const mockMovies = {
        1: {
          id: 1,
          title: 'Action Hero',
          description: 'An action-packed adventure featuring a hero who must save the world from an evil villain.',
          year: 2023,
          duration: '2h 15m',
          rating: 8.5,
          background: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Action+Hero+Background',
          cast: ['Actor One', 'Actor Two', 'Actor Three'],
          genre: ['Action', 'Adventure'],
          director: 'Director Name'
        },
        2: {
          id: 2,
          title: 'Comedy Central',
          description: 'A hilarious comedy that will have you laughing from start to finish.',
          year: 2022,
          duration: '1h 50m',
          rating: 7.8,
          background: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Comedy+Central+Background',
          cast: ['Comedy Actor 1', 'Comedy Actor 2'],
          genre: ['Comedy'],
          director: 'Comedy Director'
        },
        3: {
          id: 3,
          title: 'Sci-Fi World',
          description: 'A mind-bending science fiction journey to the future.',
          year: 2024,
          duration: '2h 28m',
          rating: 9.0,
          background: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Sci-Fi+World+Background',
          cast: ['Sci-Fi Star 1', 'Sci-Fi Star 2', 'Sci-Fi Star 3'],
          genre: ['Sci-Fi', 'Adventure'],
          director: 'Sci-Fi Director'
        },
        4: {
          id: 4,
          title: 'Horror House',
          description: 'A terrifying experience that will keep you on the edge of your seat.',
          year: 2021,
          duration: '1h 35m',
          rating: 7.2,
          background: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Horror+House+Background',
          cast: ['Horror Actor 1', 'Horror Actor 2'],
          genre: ['Horror', 'Thriller'],
          director: 'Horror Director'
        }
      };

      this.selectedMovie = mockMovies[movieId] || mockMovies[1];
      document.title = `Netflix Clone - ${this.selectedMovie.title}`;
    },
    playMovie() {
      // In a real app, this would start the video player
      console.log(`Playing ${this.selectedMovie.title}`);
      // This would route to a player page in a real app
    },
    toggleMyList() {
      // In a real app, this would add/remove from the user's list
      this.isInMyList = !this.isInMyList;
      const message = this.isInMyList ? 'added to' : 'removed from';
      alert(`${this.selectedMovie.title} ${message} your list`);
    },
    checkMyList() {
      // Check if this movie is in the user's list
      const myList = JSON.parse(localStorage.getItem('myList')) || [];
      this.isInMyList = myList.includes(this.$route.params.id);
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
</style>
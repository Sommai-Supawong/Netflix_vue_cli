<template>
  <div class="admin-editor">
    <h2>Admin Movie Editor</h2>
    <div class="movie-form">
      <div class="form-group">
        <label for="movieId">Movie ID:</label>
        <input type="number" id="movieId" v-model="movieId" />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="form-group">
        <label for="poster">Poster URL:</label>
        <input type="text" id="poster" v-model="poster" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" step="0.1" id="rating" v-model="rating" />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input type="number" id="year" v-model="year" />
      </div>
      <div class="form-group">
        <label for="duration">Duration:</label>
        <input type="text" id="duration" v-model="duration" />
      </div>
      <div class="form-group">
        <label for="background">Background URL:</label>
        <input type="text" id="background" v-model="background" />
      </div>
      <div class="form-group">
        <label for="cast">Cast (comma-separated):</label>
        <input type="text" id="cast" v-model="castInput" />
      </div>
      <div class="form-group">
        <label for="genre">Genre (comma-separated):</label>
        <input type="text" id="genre" v-model="genreInput" />
      </div>
      <div class="form-group">
        <label for="director">Director:</label>
        <input type="text" id="director" v-model="director" />
      </div>
    </div>
    <div class="button-group">
      <button @click="updateMovie" class="btn btn-primary">Update Movie</button>
      <button @click="addMovie" class="btn btn-secondary">Add New Movie</button>
      <button @click="deleteMovie" class="btn btn-danger">Delete Movie</button>
    </div>
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';

export default {
  name: 'AdminMovieEditor',
  data() {
    return {
      movieId: 1,
      title: 'Green Book',
      poster: 'https://upload.wikimedia.org/wikipedia/th/5/5b/Green_Book_%282018_poster%29.png',
      description: '2018 American comedy-drama film',
      rating: 8.5,
      year: 2018,
      duration: '2h 15m',
      background: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Green+Book+Background',
      castInput: 'Viggo Mortensen, Mahershala Ali, Linda Cardellini',
      genreInput: 'comedy, drama',
      director: 'Peter Farrelly'
    }
  },
  computed: {
    cast() {
      return this.castInput ? this.castInput.split(',').map(item => item.trim()) : [];
    },
    genre() {
      return this.genreInput ? this.genreInput.split(',').map(item => item.trim()) : [];
    }
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    async updateMovie() {
      try {
        const movieData = {
          title: this.title,
          poster: this.poster,
          description: this.description,
          rating: parseFloat(this.rating),
          year: this.year,
          duration: this.duration,
          background: this.background,
          cast: this.cast,
          genre: this.genre,
          director: this.director
        };

        const moviesStore = useMoviesStore();
        moviesStore.updateMovie(this.movieId, movieData);

        this.showCustomAlert('Movie updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating movie:', error);
        this.showCustomAlert('Error updating movie: ' + error.message, 'error');
      }
    },
    async addMovie() {
      try {
        const movieData = {
          title: this.title,
          poster: this.poster,
          description: this.description,
          rating: parseFloat(this.rating),
          year: this.year,
          duration: this.duration,
          background: this.background,
          cast: this.cast,
          genre: this.genre,
          director: this.director
        };

        const moviesStore = useMoviesStore();
        moviesStore.addMovie(movieData);

        this.showCustomAlert('Movie added successfully!', 'success');
      } catch (error) {
        console.error('Error adding movie:', error);
        this.showCustomAlert('Error adding movie: ' + error.message, 'error');
      }
    },
    async deleteMovie() {
      if (!confirm(`Are you sure you want to delete movie with ID ${this.movieId}?`)) {
        return;
      }

      try {
        const moviesStore = useMoviesStore();
        moviesStore.deleteMovie(this.movieId);

        this.showCustomAlert('Movie deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting movie:', error);
        this.showCustomAlert('Error deleting movie: ' + error.message, 'error');
      }
    }
  }
}
</script>

<style scoped>
.admin-editor {
  background-color: #181818;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.movie-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #333;
  color: white;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: #e50914;
  color: white;
}

.btn-secondary {
  background-color: #333;
  color: white;
}

.btn-danger {
  background-color: #ff4757;
  color: white;
}

@media (max-width: 768px) {
  .movie-form {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>
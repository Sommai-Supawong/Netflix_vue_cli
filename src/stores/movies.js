import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => ({ 
    list: [], 
    loading: false,
    error: null,
    cache: {}, // Cache for storing API responses
    lastFetch: 0 // Timestamp of last fetch
  }),
  actions: {
    initializeMovies() {
      // Initialize from localStorage on first load
      const savedMovies = localStorage.getItem('movies');
      if (savedMovies) {
        this.list = JSON.parse(savedMovies);
      } else {
        // Use mock data as initial data if no saved data exists
        this.list = this.getMockMovies();
        this.saveToLocalStorage();
      }
    },
    
    async fetchMovies() {
      // Load movies from localStorage if available
      this.initializeMovies();
      return Promise.resolve(); // Return immediately since we're using local storage
    },
    
    // Add method to save to localStorage
    saveToLocalStorage() {
      localStorage.setItem('movies', JSON.stringify(this.list));
    },
    
    // Add method to clear cache
    clearCache() {
      this.cache = {};
    },
    
    // Add method to refresh data (reload from localStorage)
    async refreshMovies() {
      this.initializeMovies();
    },
    getMockMovies() {
      // Return mock data in case API is not available
      return [
        { id: 1, title: 'Green Book', poster: 'https://upload.wikimedia.org/wikipedia/th/5/5b/Green_Book_%282018_poster%29.png', description: '2018 American comedy-drama film', rating: 8.5, videoLink: 'https://www.youtube.com/watch?v=6twERZk2U2s', genre: 'drama' },
        { id: 2, title: 'Comedy Central', poster: 'https://via.placeholder.com/300x450/f0932b/ffffff?text=Comedy', description: 'Hilarious comedy hits', rating: 7.8, videoLink: 'https://www.youtube.com/watch?v=5vTGe9Fuz3w', genre: 'comedy' },
        { id: 3, title: 'Sci-Fi World', poster: 'https://via.placeholder.com/300x450/1e90ff/ffffff?text=Sci-Fi', description: 'Mind-bending science fiction', rating: 9.0, videoLink: 'https://www.youtube.com/watch?v=4TjgfQdaeo4', genre: 'sci-fi' },
        { id: 4, title: 'Horror House', poster: 'https://via.placeholder.com/300x450/ff4757/ffffff?text=Horror', description: 'Scary and suspenseful', rating: 7.2, videoLink: 'https://www.youtube.com/watch?v=ixi6fxY4X4o', genre: 'horror' },
        { id: 5, title: 'Drama Queen', poster: 'https://via.placeholder.com/300x450/6c5ce7/ffffff?text=Drama', description: 'Emotional drama series', rating: 8.9, videoLink: 'https://www.youtube.com/watch?v=0tv5_9Q2w50', genre: 'drama' },
        { id: 6, title: 'Romance Story', poster: 'https://via.placeholder.com/300x450/fd79a8/ffffff?text=Romance', description: 'Heartwarming romantic tale', rating: 8.1, videoLink: 'https://www.youtube.com/watch?v=0zKhPsp9sOY', genre: 'romance' },
        { id: 7, title: 'Fast & Furious', poster: 'https://via.placeholder.com/300x450/e17055/ffffff?text=Action', description: 'High-octane action sequence', rating: 8.2, videoLink: 'https://www.youtube.com/watch?v=2lOkPb1FzqA', genre: 'action' },
        { id: 8, title: 'Romantic Comedy', poster: 'https://via.placeholder.com/300x450/fdcb6e/ffffff?text=Rom-Com', description: 'Perfect blend of romance and comedy', rating: 7.9, videoLink: 'https://www.youtube.com/watch?v=35uU7gDQOzA', genre: 'romance' },
        { id: 9, title: 'Adventure Quest', poster: 'https://via.placeholder.com/300x450/74b9ff/ffffff?text=Adventure', description: 'Epic adventure in unknown lands', rating: 8.4, videoLink: 'https://www.youtube.com/watch?v=4fndLXZ2a8o', genre: 'adventure' },
        { id: 10, title: 'Thriller Night', poster: 'https://via.placeholder.com/300x450/2d3436/ffffff?text=Thriller', description: 'Suspenseful thriller with twists', rating: 8.0, videoLink: 'https://www.youtube.com/watch?v=12L6L8iQY_Q', genre: 'thriller' },
        { id: 11, title: 'Animation Magic', poster: 'https://via.placeholder.com/300x450/00b894/ffffff?text=Animation', description: 'Beautiful animated feature film', rating: 8.7, videoLink: 'https://www.youtube.com/watch?v=1CvEd_anP1A', genre: 'animation' },
        { id: 12, title: 'Documentary Truth', poster: 'https://via.placeholder.com/300x450/6c5ce7/ffffff?text=Documentary', description: 'Real stories documented', rating: 9.1, videoLink: 'https://www.youtube.com/watch?v=2A66yy3rKdI', genre: 'documentary' },
        { id: 13, title: 'Space Odyssey', poster: 'https://via.placeholder.com/300x450/1e90ff/ffffff?text=Sci-Fi', description: 'Journey through space and time', rating: 8.8, videoLink: 'https://www.youtube.com/watch?v=12L6L8iQY_Q', genre: 'sci-fi' },
        { id: 14, title: 'Action Hero', poster: 'https://via.placeholder.com/300x450/e17055/ffffff?text=Action', description: 'Hero saves the world again', rating: 7.7, videoLink: 'https://www.youtube.com/watch?v=2lOkPb1FzqA', genre: 'action' },
        { id: 15, title: 'Animated Adventure', poster: 'https://via.placeholder.com/300x450/00b894/ffffff?text=Animation', description: 'Fun animated journey for all ages', rating: 8.3, videoLink: 'https://www.youtube.com/watch?v=1CvEd_anP1A', genre: 'animation' },
        { id: 16, title: 'Fantasy Realm', poster: 'https://via.placeholder.com/300x450/74b9ff/ffffff?text=Fantasy', description: 'Magical world with dragons and wizards', rating: 8.5, videoLink: 'https://www.youtube.com/watch?v=4fndLXZ2a8o', genre: 'fantasy' },
      ];
    },
    
    // Add a method to update a movie
    updateMovie(movieId, updatedData) {
      const movieIndex = this.list.findIndex(movie => movie.id === parseInt(movieId));
      if (movieIndex !== -1) {
        // Use $patch to properly update the state and trigger reactivity
        this.list[movieIndex] = { ...this.list[movieIndex], ...updatedData };
        this.saveToLocalStorage(); // Save to localStorage after update
      } else {
        // If movie doesn't exist in the list, add it
        this.list.push({ id: parseInt(movieId), ...updatedData });
        this.saveToLocalStorage(); // Save to localStorage after addition
      }
    },
    
    // Add a method to delete a movie
    deleteMovie(movieId) {
      const movieIndex = this.list.findIndex(movie => movie.id === parseInt(movieId));
      if (movieIndex !== -1) {
        this.list.splice(movieIndex, 1);
        this.saveToLocalStorage(); // Save to localStorage after deletion
      }
    },
    
    // Add a method to find a specific movie
    findMovie(movieId) {
      return this.list.find(movie => movie.id === parseInt(movieId));
    },
    
    // Add a method to add a new movie
    addMovie(movieData) {
      const newMovie = { id: this.generateId(), ...movieData };
      this.list.push(newMovie);
      this.saveToLocalStorage(); // Save to localStorage after addition
      return newMovie; // Return the new movie with ID
    },
    
    // Helper method to generate a unique ID
    generateId() {
      return this.list.length > 0 ? Math.max(...this.list.map(m => m.id)) + 1 : 1;
    }
  },
});

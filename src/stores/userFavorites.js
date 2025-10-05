import { defineStore } from "pinia";
import { getUserFavorites, addToFavorites, removeFromFavorites } from "@/api";

export const useUserFavoritesStore = defineStore("userFavorites", {
  state: () => ({ 
    favoriteMovies: [], 
    loading: false,
    error: null,
  }),
  
  actions: {
    // Initialize favorites from localStorage as fallback
    async initializeFavorites() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await this.fetchUserFavorites();
        } else {
          // Fallback to localStorage if no token
          const storedFavorites = JSON.parse(localStorage.getItem('myList') || '[]');
          this.favoriteMovies = storedFavorites;
        }
      } catch (error) {
        console.error('Error initializing favorites:', error);
        // Fallback to localStorage if API fails
        const storedFavorites = JSON.parse(localStorage.getItem('myList') || '[]');
        this.favoriteMovies = storedFavorites;
      }
    },
    
    // Fetch user's favorite movies from the API
    async fetchUserFavorites() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Make API call to get user's favorites
          const response = await getUserFavorites();
          this.favoriteMovies = response.data.map(fav => fav.movieId || fav.id);
        } else {
          // Fallback to localStorage if no token
          const storedFavorites = JSON.parse(localStorage.getItem('myList') || '[]');
          this.favoriteMovies = storedFavorites;
        }
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
        console.error('Error fetching favorites:', error);
        
        // Fallback to localStorage if API fails
        const storedFavorites = JSON.parse(localStorage.getItem('myList') || '[]');
        this.favoriteMovies = storedFavorites;
      }
    },
    
    // Add a movie to user's favorites
    async addToFavorites(movieId) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Make API call to add to user's favorites
          await addToFavorites(movieId);
          // Update local state only after successful API call
          if (!this.favoriteMovies.includes(movieId)) {
            this.favoriteMovies.push(movieId);
          }
        } else {
          // Fallback to localStorage if no token
          if (!this.favoriteMovies.includes(movieId)) {
            this.favoriteMovies.push(movieId);
            localStorage.setItem('myList', JSON.stringify(this.favoriteMovies));
          }
        }
      } catch (error) {
        // Handle network errors gracefully by using localStorage fallback
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.warn('Network error occurred, using localStorage fallback for adding to favorites');
          // Fallback to localStorage even if token exists but network fails
          if (!this.favoriteMovies.includes(movieId)) {
            this.favoriteMovies.push(movieId);
            localStorage.setItem('myList', JSON.stringify(this.favoriteMovies));
          }
        } else {
          this.error = error.message;
          console.error('Error adding to favorites:', error);
          throw error;
        }
      }
    },
    
    // Remove a movie from user's favorites
    async removeFromFavorites(movieId) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Make API call to remove from user's favorites
          await removeFromFavorites(movieId);
          // Update local state only after successful API call
          this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
        } else {
          // Fallback to localStorage if no token
          this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
          localStorage.setItem('myList', JSON.stringify(this.favoriteMovies));
        }
      } catch (error) {
        // Handle network errors gracefully by using localStorage fallback
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.warn('Network error occurred, using localStorage fallback for removing from favorites');
          // Fallback to localStorage even if token exists but network fails
          this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
          localStorage.setItem('myList', JSON.stringify(this.favoriteMovies));
        } else {
          this.error = error.message;
          console.error('Error removing from favorites:', error);
          throw error;
        }
      }
    },
    
    // Check if a movie is in the user's favorites
    isFavorite(movieId) {
      return this.favoriteMovies.includes(movieId);
    },
    
    // Toggle a movie in the user's favorites
    async toggleFavorite(movieId) {
      const isFavorite = this.isFavorite(movieId);
      try {
        if (isFavorite) {
          await this.removeFromFavorites(movieId);
        } else {
          await this.addToFavorites(movieId);
        }
        return !isFavorite;
      } catch (error) {
        // If API calls fail but localStorage operations succeed, we still want to return the new state
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          console.warn('Network error occurred, but operation completed in localStorage');
          const newIsFavorite = !isFavorite;
          return newIsFavorite;
        } else {
          throw error;
        }
      }
    },
    
    // Sync with localStorage (for migration purposes)
    syncWithLocalStorage() {
      const localStorageFavorites = JSON.parse(localStorage.getItem('myList') || '[]');
      if (localStorageFavorites.length > 0 && this.favoriteMovies.length === 0) {
        this.favoriteMovies = localStorageFavorites;
      }
    }
  },
});
<template>
  <div class="admin-movie-management">
    <div class="management-header">
      <h1>จัดการข้อมูลหนัง</h1>
      <div class="admin-info">
        <button @click="goToDashboard" class="dashboard-btn">กลับไปหน้าหลักผู้ดูแล</button>
        <button @click="logout" class="logout-btn">ออกจากระบบ</button>
      </div>
    </div>

    <div class="management-content">
      <div class="movie-form">
        <h2>{{ editingMovie ? 'แก้ไขหนัง' : 'เพิ่มหนังใหม่' }}</h2>
        <div class="form-group">
          <label for="movieId">ID หนัง:</label>
          <input 
            type="number" 
            id="movieId" 
            v-model="movieId" 
            :disabled="!!editingMovie"
            placeholder="ระบบจะสร้างอัตโนมัติหากเป็นหนังใหม่"
          />
        </div>
        <div class="form-group">
          <label for="title">ชื่อหนัง:</label>
          <input 
            type="text" 
            id="title" 
            v-model="title" 
            placeholder="กรุณากรอกชื่อหนัง"
            required
          />
        </div>
        <div class="form-group">
          <label for="poster">URL โปสเตอร์:</label>
          <input 
            type="text" 
            id="poster" 
            v-model="poster" 
            placeholder="ลิงก์รูปภาพโปสเตอร์"
          />
        </div>
        <div class="form-group">
          <label for="description">คำอธิบาย:</label>
          <textarea 
            id="description" 
            v-model="description" 
            placeholder="กรอกรายละเอียดของหนัง"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="rating">เรตติ้ง:</label>
          <input 
            type="number" 
            step="0.1" 
            min="0" 
            max="10" 
            id="rating" 
            v-model="rating" 
            placeholder="0.0 - 10.0"
          />
        </div>
        <div class="form-group">
          <label for="year">ปี:</label>
          <input 
            type="number" 
            id="year" 
            v-model="year" 
            placeholder="ปีที่ออก"
          />
        </div>
        <div class="form-group">
          <label for="duration">ระยะเวลา:</label>
          <input 
            type="text" 
            id="duration" 
            v-model="duration" 
            placeholder="เช่น 2h 15m"
          />
        </div>
        <div class="form-group">
          <label for="background">URL พื้นหลัง:</label>
          <input 
            type="text" 
            id="background" 
            v-model="background" 
            placeholder="ลิงก์รูปภาพพื้นหลัง"
          />
        </div>
        <div class="form-group">
          <label for="cast">นักแสดง (คั่นด้วย comma):</label>
          <input 
            type="text" 
            id="cast" 
            v-model="castInput" 
            placeholder="นักแสดงหลัก, นักแสดงรอง"
          />
        </div>
        <div class="form-group">
          <label for="genre">ประเภท:</label>
          <div class="custom-select" v-click-outside="closeGenreDropdown">
            <div class="select-header" @click="toggleGenreDropdown">
              <span v-if="selectedGenres.length === 0" class="placeholder">เลือกประเภทหนัง...</span>
              <span v-else>{{ selectedGenres.length }} ประเภทที่เลือก</span>
              <i :class="['arrow', { 'down': !showGenreDropdown, 'up': showGenreDropdown }]">▼</i>
            </div>
            <div class="select-dropdown" v-if="showGenreDropdown">
              <div 
                v-for="option in genreOptions" 
                :key="option.value"
                class="option"
                :class="{ selected: isGenreSelected(option.value) }"
                @click="toggleGenre(option.value)"
              >
                <span class="checkmark" v-if="isGenreSelected(option.value)">✓</span>
                <span>{{ option.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="director">ผู้กำกับ:</label>
          <input 
            type="text" 
            id="director" 
            v-model="director" 
            placeholder="ชื่อผู้กำกับ"
          />
        </div>
        <div class="form-group">
          <label for="videoLink">ลิงค์วิดีโอ:</label>
          <input 
            type="text" 
            id="videoLink" 
            v-model="videoLink" 
            placeholder="https://example.com/video"
          />
        </div>
        <div class="form-actions">
          <button @click="submitMovie" class="submit-btn">{{ editingMovie ? 'อัปเดตหนัง' : 'เพิ่มหนัง' }}</button>
          <button @click="resetForm" class="reset-btn">ล้างฟอร์ม</button>
          <button v-if="editingMovie" @click="cancelEdit" class="cancel-btn">ยกเลิกการแก้ไข</button>
        </div>
      </div>

      <div class="movie-list">
        <h2>รายการหนังทั้งหมด</h2>
        <div class="search-filter">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาหนัง..."
            class="search-input"
          />
          <div class="custom-select filter-select" v-click-outside="closeFilterDropdown">
            <div class="select-header" @click="toggleFilterDropdown">
              <span v-if="filterCategory === ''" class="placeholder">ทุกประเภท</span>
              <span v-else>{{ getFilterLabel(filterCategory) }}</span>
              <i :class="['arrow', { 'down': !showFilterDropdown, 'up': showFilterDropdown }]">▼</i>
            </div>
            <div class="select-dropdown" v-if="showFilterDropdown">
              <div 
                v-for="option in [{value: '', label: 'ทุกประเภท'}, ...genreOptions]" 
                :key="option.value"
                class="option"
                :class="{ selected: filterCategory === option.value }"
                @click="selectFilterCategory(option.value)"
              >
                <span class="checkmark" v-if="filterCategory === option.value">✓</span>
                <span>{{ option.label }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="movies-grid">
          <div 
            v-for="movie in filteredMovies" 
            :key="movie.id" 
            class="movie-item"
          >
            <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
            <div class="movie-details">
              <h3>{{ movie.title }}</h3>
              <p class="movie-description">{{ movie.description }}</p>
              <div class="movie-meta">
                <span class="rating">★ {{ movie.rating }}</span>
                <span class="year">{{ movie.year }}</span>
              </div>
              <div class="movie-actions">
                <button @click="editMovie(movie)" class="edit-btn">แก้ไข</button>
                <button @click="deleteMovie(movie.id)" class="delete-btn">ลบ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';
import { getAdminData, clearAdminAuth } from '@/utils/adminAuth';

export default {
  directives: {
    'click-outside': {
      beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value();
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  name: 'AdminMovieManagement',
  data() {
    return {
      movieId: null,
      title: '',
      poster: '',
      description: '',
      rating: 0,
      year: null,
      duration: '',
      background: '',
      castInput: '',
      genreInput: [],
      director: '',
      videoLink: '',
      editingMovie: null,
      searchQuery: '',
      filterCategory: '',
      showGenreDropdown: false,
      showFilterDropdown: false,
      genreOptions: [
        { value: 'action', label: 'แอคชั่น' },
        { value: 'comedy', label: 'ตลก' },
        { value: 'drama', label: 'ดราม่า' },
        { value: 'horror', label: 'สยองขวัญ' },
        { value: 'scifi', label: 'ไซไฟ' },
        { value: 'thriller', label: 'ตื่นเต้นเร้าใจ' },
        { value: 'romance', label: 'โรแมนติก' },
        { value: 'adventure', label: 'ผจญภัย' },
        { value: 'fantasy', label: 'แฟนตาซี' },
        { value: 'animation', label: 'อนิเมชัน' }
      ]
    }
  },
  computed: {
    selectedGenres() {
      // If genreInput is an array of strings, return it directly
      if (Array.isArray(this.genreInput)) {
        return this.genreInput;
      }
      // Fallback for string input
      return this.genreInput ? this.genreInput.split(',').map(item => item.trim()) : [];
    },
    cast() {
      return this.castInput ? this.castInput.split(',').map(item => item.trim()) : [];
    },
    genre() {
      // Use the computed selectedGenres property
      return this.selectedGenres;
    },
    moviesStore() {
      return useMoviesStore();
    },
    filteredMovies() {
      let movies = this.moviesStore.list;
      
      // ค้นหาตามชื่อ
      if (this.searchQuery) {
        movies = movies.filter(movie => 
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      // กรองตามประเภท
      if (this.filterCategory) {
        movies = movies.filter(movie => {
          if (!movie.genre) return false;
          // Check if movie has the selected genre
          return Array.isArray(movie.genre) 
            ? movie.genre.includes(this.filterCategory)
            : movie.genre.toLowerCase().includes(this.filterCategory.toLowerCase());
        });
      }
      
      return movies;
    }
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    toggleGenreDropdown() {
      this.showGenreDropdown = !this.showGenreDropdown;
    },
    closeGenreDropdown() {
      this.showGenreDropdown = false;
    },
    isGenreSelected(genreValue) {
      return this.selectedGenres.includes(genreValue);
    },
    toggleGenre(genreValue) {
      const index = this.selectedGenres.indexOf(genreValue);
      if (index > -1) {
        // Remove genre
        this.selectedGenres.splice(index, 1);
      } else {
        // Add genre
        this.selectedGenres.push(genreValue);
      }
      // Update the actual genreInput field
      this.genreInput = [...this.selectedGenres];
    },
    toggleFilterDropdown() {
      this.showFilterDropdown = !this.showFilterDropdown;
    },
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    selectFilterCategory(category) {
      this.filterCategory = category;
      this.showFilterDropdown = false;
    },
    getFilterLabel(category) {
      if (category === '') return 'ทุกประเภท';
      const option = this.genreOptions.find(opt => opt.value === category);
      return option ? option.label : category;
    },
    async submitMovie() {
      if (!this.title.trim()) {
        this.showCustomAlert('กรุณากรอกชื่อหนัง', 'warning');
        return;
      }

      try {
        const movieData = {
          title: this.title,
          poster: this.poster,
          description: this.description,
          rating: parseFloat(this.rating) || 0,
          year: parseInt(this.year) || new Date().getFullYear(),
          duration: this.duration || 'N/A',
          background: this.background,
          cast: this.cast,
          genre: this.genre,
          director: this.director,
          videoLink: this.videoLink
        };

        if (this.editingMovie) {
          // แก้ไขหนังที่มีอยู่แล้ว
          this.moviesStore.updateMovie(this.movieId, movieData);
          this.showCustomAlert('อัปเดตข้อมูลหนังเรียบร้อยแล้ว', 'success');
        } else {
          // เพิ่มหนังใหม่
          this.moviesStore.addMovie(movieData);
          this.showCustomAlert('เพิ่มหนังใหม่เรียบร้อยแล้ว', 'success');
        }

        // รีเซ็ตฟอร์ม
        this.resetForm();
      } catch (error) {
        console.error('Error submitting movie:', error);
        this.showCustomAlert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message, 'error');
      }
    },
    editMovie(movie) {
      this.editingMovie = { ...movie };
      this.movieId = movie.id;
      this.title = movie.title;
      this.poster = movie.poster;
      this.description = movie.description;
      this.rating = movie.rating;
      this.year = movie.year;
      this.duration = movie.duration;
      this.background = movie.background;
      this.castInput = movie.cast ? movie.cast.join(', ') : '';
      this.genreInput = movie.genre ? movie.genre : [];
      this.director = movie.director;
      this.videoLink = movie.videoLink || '';
      
      // เลื่อนไปยังส่วนฟอร์ม
      this.$nextTick(() => {
        document.querySelector('.movie-form').scrollIntoView({ behavior: 'smooth' });
      });
    },
    async deleteMovie(movieId) {
      if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบหนังนี้?`)) {
        return;
      }

      try {
        this.moviesStore.deleteMovie(movieId);
        this.showCustomAlert('ลบหนังเรียบร้อยแล้ว', 'success');
      } catch (error) {
        console.error('Error deleting movie:', error);
        this.showCustomAlert('เกิดข้อผิดพลาดในการลบข้อมูล: ' + error.message, 'error');
      }
    },
    resetForm() {
      this.movieId = null;
      this.title = '';
      this.poster = '';
      this.description = '';
      this.rating = 0;
      this.year = null;
      this.duration = '';
      this.background = '';
      this.castInput = '';
      this.genreInput = [];
      this.director = '';
      this.videoLink = '';
      this.editingMovie = null;
    },
    cancelEdit() {
      this.resetForm();
    },
    goToDashboard() {
      this.$router.push('/admin/dashboard');
    },
    logout() {
      clearAdminAuth();
      this.$router.push('/login');
    }
  },
  async created() {
    document.title = 'Netflix Clone - จัดการข้อมูลหนัง';
    
    // ตรวจสอบว่าเข้าสู่ระบบเป็นผู้ดูแลระบบหรือไม่
    if (!getAdminData()) {
      this.$router.push('/login');
      return;
    }
    
    // ดึงข้อมูลจาก store
    this.moviesStore.initializeMovies();
  }
}
</script>

<style scoped>
.admin-movie-management {
  background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.management-header h1 {
  color: #e50914;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(to right, #e50914, #ff4757);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.admin-info {
  display: flex;
  gap: 12px;
}

.dashboard-btn, .logout-btn {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-btn {
  background: linear-gradient(145deg, #333, #222);
  color: white;
}

.logout-btn {
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
}

.dashboard-btn:hover {
  background: linear-gradient(145deg, #444, #333);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.logout-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.3);
}

.management-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
}

.movie-form {
  background: linear-gradient(145deg, #222, #1a1a1a);
  padding: 25px;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.movie-form h2 {
  margin-top: 0;
  color: #e50914;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #ddd;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background: linear-gradient(145deg, #333, #222);
  color: white;
  font-size: 15px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.3), inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.submit-btn {
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(229, 9, 20, 0.3);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reset-btn {
  background: linear-gradient(145deg, #333, #222);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cancel-btn {
  background: linear-gradient(145deg, #7f8c8d, #5d6d7e);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.submit-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
}

.reset-btn:hover {
  background: linear-gradient(145deg, #444, #333);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.cancel-btn:hover {
  background: linear-gradient(145deg, #5d6d7e, #7f8c8d);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.movie-list {
  background: linear-gradient(145deg, #222, #1a1a1a);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.movie-list h2 {
  color: #e50914;
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-filter {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.search-input, .filter-select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #444;
  background: linear-gradient(145deg, #333, #222);
  color: white;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.search-input:focus, .filter-select:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.3), inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
  padding: 10px;
}

.movies-grid::-webkit-scrollbar {
  width: 10px;
}

.movies-grid::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 10px;
}

.movies-grid::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;
}

.movies-grid::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.movie-item {
  display: flex;
  background: linear-gradient(145deg, #333, #2a2a2a);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.movie-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.movie-poster {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 0 12px 12px 0;
}

.movie-details {
  padding: 15px;
  flex: 1;
}

.movie-details h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.movie-description {
  font-size: 0.95rem;
  color: #bbb;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.movie-meta {
  display: flex;
  gap: 15px;
  margin: 8px 0 12px 0;
  font-size: 0.95rem;
  color: #ddd;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.rating {
  color: #f5c518;
  font-weight: 600;
}

.movie-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.edit-btn {
  background: linear-gradient(145deg, #3498db, #2980b9);
  color: white;
}

.delete-btn {
  background: linear-gradient(145deg, #e74c3c, #c0392b);
  color: white;
}

.edit-btn:hover {
  background: linear-gradient(145deg, #2980b9, #3498db);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.delete-btn:hover {
  background: linear-gradient(145deg, #c0392b, #e74c3c);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
}

/* Custom Select Dropdown Styles */
.custom-select {
  position: relative;
  width: 100%;
  min-width: 200px;
}

.filter-select {
  min-width: 200px;
}

.select-header {
  padding: 12px;
  border: 1px solid #444;
  background: linear-gradient(145deg, #333, #222);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}

.select-header .placeholder {
  color: #999;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 0.8em;
  color: #b3b3b3;
}

.arrow.up {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(145deg, #222, #1a1a1a);
  border: 1px solid #444;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
}

.option {
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
}

.option:hover {
  background: linear-gradient(145deg, #333, #2a2a2a);
}

.option.selected {
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
}

.option:last-child {
  border-bottom: none;
  border-radius: 0 0 8px 8px;
}

.checkmark {
  font-size: 0.9em;
  min-width: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .management-content {
    grid-template-columns: 1fr;
  }
  
  .management-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .admin-info {
    align-self: flex-end;
    width: 100%;
    justify-content: flex-end;
  }
  
  .movies-grid {
    grid-template-columns: 1fr;
    max-height: none;
    overflow-y: visible;
  }
  
  .movie-item {
    flex-direction: column;
  }
  
  .movie-poster {
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
  }
  
  .search-filter {
    flex-direction: column;
  }
  
  .custom-select, .filter-select {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
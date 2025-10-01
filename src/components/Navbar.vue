<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">Netflix Clone</router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/browse" class="nav-item">Browse</router-link>
        <router-link to="/my-list" class="nav-item">My List</router-link>
      </div>
      <div class="nav-auth">
        <router-link to="/login" v-if="!isLoggedIn" class="nav-item">Sign In</router-link>
        <a href="#" v-else class="nav-item" @click="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn() {
      return localStorage.getItem('token') !== null;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
}

.nav-logo a {
  color: #e50914;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #b3b3b3;
}

.nav-auth {
  display: flex;
  gap: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    padding: 15px 20px;
  }
  
  .nav-logo {
    font-size: 1.5rem;
  }
  
  .nav-menu {
    gap: 15px;
  }
}
</style>
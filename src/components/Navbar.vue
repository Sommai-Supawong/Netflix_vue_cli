<template>
  <nav class="navbar" :class="{ scrolled: scrolled }">
    <div class="nav-container">
      <div class="nav-logo">
        <router-link to="/">Netflix Clone</router-link>
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/browse" class="nav-item">Browse</router-link>
        <router-link to="/my-list" class="nav-item">My List</router-link>
        <!-- แสดงลิงก์ผู้ดูแลระบบเมื่อเข้าสู่ระบบเป็นผู้ดูแล -->
        <router-link to="/admin/dashboard" v-if="isAdmin" class="nav-item admin-link">Dashboard</router-link>
        <router-link to="/admin/movies" v-if="isAdmin" class="nav-item admin-link">จัดการหนัง</router-link>
      </div>
      <div class="nav-auth">
        <!-- ถ้าล็อกอินเป็นแอดมิน แสดงปุ่มจัดการหนังและปุ่มล็อกเอาต์ -->
        <div v-if="isAdmin" class="auth-menu">
          <a href="#" class="nav-item admin-logout" @click="adminLogout">Logout</a>
        </div>
        <!-- ถ้าล็อกอินเป็นผู้ใช้ทั่วไป -->
        <a v-else-if="isLoggedIn" href="#" class="nav-item" @click="logout">Logout</a>
        <!-- ถ้าไม่ได้ล็อกอินทั้งสองแบบ -->
        <div v-else class="auth-menu">
          <router-link to="/login" class="nav-item">Sign In</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAdminData, clearAdminAuth } from '@/utils/adminAuth';
import { isUserAuthenticated, clearUserAuth } from '@/utils/userAuth';

export default {
  name: 'AppNavbar',
  data() {
    return {
      scrolled: false
    }
  },
  computed: {
    isLoggedIn() {
      return isUserAuthenticated() || (getAdminData() !== null);
    },
    isAdmin() {
      return getAdminData() !== null;
    }
  },
  methods: {
    logout() {
      // Clear both user and admin authentication
      clearUserAuth();
      this.$router.push('/');
    },
    adminLogout() {
      clearAdminAuth();
      this.$router.push('/');
    },
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(12px);
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 800;
  color: #e50914;
  letter-spacing: 1px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.2s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.nav-logo a {
  color: #e50914;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.nav-menu {
  display: flex;
  gap: 1.8rem;
}

.nav-item {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.nav-item.router-link-exact-active {
  color: #e50914 !important;
  font-weight: 700;
  background: rgba(229, 9, 20, 0.1);
}

.nav-item.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #e50914, #ff4757);
}

.nav-item:hover {
  color: #e50914;
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
}

.admin-link {
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.admin-link:hover {
  background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(229, 9, 20, 0.3);
}

.auth-menu {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.admin-logout {
  background: linear-gradient(145deg, #e50914, #b20710);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.admin-logout:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 1.25rem;
  }
  
  .nav-logo {
    font-size: 1.4rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-item {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }
  
  .admin-link, .admin-logout {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}

/* Animation for navbar items */
.nav-item {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
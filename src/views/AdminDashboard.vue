<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>หน้าควบคุมผู้ดูแลระบบ</h1>
      <div class="admin-info">
        <span>ผู้ใช้: {{ username }}</span>
        <button @click="logout" class="logout-btn">ออกจากระบบ</button>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-menu">
        <div class="menu-item" @click="goTo('admin/movies')">
          <div class="menu-icon">🎬</div>
          <div class="menu-text">จัดการหนัง</div>
        </div>
        <div class="menu-item" @click="goTo('admin/statistics')">
          <div class="menu-icon">📊</div>
          <div class="menu-text">สถิติการเข้าชม</div>
        </div>
        <div class="menu-item" @click="goTo('admin/users')">
          <div class="menu-icon">👥</div>
          <div class="menu-text">จัดการผู้ใช้งาน</div>
        </div>
        <div class="menu-item" @click="goTo('admin/settings')">
          <div class="menu-icon">⚙️</div>
          <div class="menu-text">ตั้งค่าระบบ</div>
        </div>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>จำนวนหนังทั้งหมด</h3>
          <p class="stat-value">{{ totalMovies }}</p>
        </div>
        <div class="stat-card">
          <h3>จำนวนผู้ใช้งาน</h3>
          <p class="stat-value">{{ totalUsers }}</p>
        </div>
        <div class="stat-card">
          <h3>หนังที่ถูกเข้าชมมากที่สุด</h3>
          <p class="stat-value">{{ mostViewedMovie }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMoviesStore } from '@/stores/movies';
import { getAdminData, clearAdminAuth, isAdminAuthenticated } from '@/utils/adminAuth';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      username: '',
      totalMovies: 0,
      totalUsers: 0,
      mostViewedMovie: 'ยังไม่มีข้อมูล'
    }
  },
  methods: {
    goTo(route) {
      if (route === 'admin/users') {
        this.$router.push('/admin/users');
      } else {
        this.$router.push(`/${route}`);
      }
    },
    logout() {
      clearAdminAuth();
      this.$router.push('/login');
    }
  },
  async created() {
    document.title = 'Netflix Clone - หน้าควบคุมผู้ดูแลระบบ';
    
    // ตรวจสอบว่าเข้าสู่ระบบเป็นผู้ดูแลระบบหรือไม่
    if (!isAdminAuthenticated()) {
      this.$router.push('/login');
      return;
    }
    
    // ตั้งค่าชื่อผู้ใช้จากข้อมูลที่จัดเก็บ
    const adminData = getAdminData();
    this.username = adminData.username;
    
    // ดึงข้อมูลจาก store
    const moviesStore = useMoviesStore();
    await moviesStore.fetchMovies();
    
    // ตั้งค่าข้อมูลสถิติ
    this.totalMovies = moviesStore.list.length;
    this.totalUsers = 150;  // ค่าตัวอย่าง
    this.mostViewedMovie = moviesStore.list.length > 0 ? moviesStore.list[0].title : 'ยังไม่มีข้อมูล';
  }
}
</script>

<style scoped>
.admin-dashboard {
  background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
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

.dashboard-header h1 {
  color: #e50914;
  font-size: 2.5rem;
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
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 10px 20px;
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(229, 9, 20, 0.3);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logout-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

.dashboard-menu {
  background: linear-gradient(145deg, #222, #1a1a1a);
  border-radius: 12px;
  padding: 25px;
  height: fit-content;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.menu-item:hover {
  background: linear-gradient(145deg, #333, #2a2a2a);
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.menu-icon {
  font-size: 1.8rem;
  margin-right: 15px;
  width: 30px;
  text-align: center;
}

.menu-text {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.stat-card {
  background: linear-gradient(145deg, #222, #1a1a1a);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  margin-bottom: 15px;
  color: #ddd;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #b3b3b3;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #e50914;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(229, 9, 20, 0.3);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 15px;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .admin-info {
    width: 100%;
    justify-content: center;
  }
  
  .stat-value {
    font-size: 2rem;
  }
}
</style>
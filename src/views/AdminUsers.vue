<template>
  <div class="admin-users">
    <div class="admin-container">
      <h1>จัดการผู้ใช้</h1>
      
      <div class="users-stats">
        <div class="stat-card">
          <h3>จำนวนผู้ใช้ทั้งหมด</h3>
          <p class="stat-value">{{ users.length }}</p>
        </div>
        <div class="stat-card">
          <h3>ผู้ใช้งานที่ใช้งานล่าสุด</h3>
          <p class="stat-value">{{ activeUsersCount }}</p>
        </div>
        <div class="stat-card">
          <h3>ผู้ใช้ที่ลงทะเบียนเดือนนี้</h3>
          <p class="stat-value">{{ newUsersThisMonth }}</p>
        </div>
      </div>
      
      <div class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อ</th>
              <th>อีเมล</th>
              <th>บทบาท</th>
              <th>วันที่ลงทะเบียน</th>
              <th>สถานะ</th>
              <th>การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id || 'N/A' }}</td>
              <td>{{ user.name || 'N/A' }}</td>
              <td>{{ user.email || 'N/A' }}</td>
              <td>
                <span :class="['role-badge', user.role]">
                  {{ user.role === 'admin' ? 'แอดมิน' : 'ผู้ใช้ทั่วไป' }}
                </span>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td>
                <span :class="['status-badge', user.status || 'active']">
                  {{ user.status === 'inactive' ? 'ไม่ใช้งาน' : 'ใช้งานอยู่' }}
                </span>
              </td>
              <td>
                <button class="action-btn view-btn" @click="viewUser(user)">ดูรายละเอียด</button>
                <button class="action-btn edit-btn" @click="editUser(user)">แก้ไข</button>
                <button class="action-btn delete-btn" @click="deleteUser(user.id)">ลบ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- User Detail Modal -->
    <div v-if="showUserDetailModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>รายละเอียดผู้ใช้</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="user-info">
            <p><strong>ชื่อ:</strong> {{ selectedUser.name }}</p>
            <p><strong>อีเมล:</strong> {{ selectedUser.email }}</p>
            <p><strong>บทบาท:</strong> {{ selectedUser.role === 'admin' ? 'แอดมิน' : 'ผู้ใช้ทั่วไป' }}</p>
            <p><strong>วันที่ลงทะเบียน:</strong> {{ formatDate(selectedUser.createdAt) }}</p>
            <p><strong>สถานะ:</strong> {{ selectedUser.status === 'inactive' ? 'ไม่ใช้งาน' : 'ใช้งานอยู่' }}</p>
            <p><strong>วันที่เข้าใช้งานล่าสุด:</strong> {{ selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'ยังไม่เคยเข้าใช้' }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script>
import CustomAlert from '@/components/CustomAlert.vue';
import { isAdminAuthenticated } from '@/utils/adminAuth';

export default {
  name: 'AdminUsers',
  components: {
    CustomAlert
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      showUserDetailModal: false
    }
  },
  computed: {
    activeUsersCount() {
      return this.users.filter(user => user.status !== 'inactive').length;
    },
    newUsersThisMonth() {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      return this.users.filter(user => {
        const createdAt = new Date(user.createdAt);
        return createdAt >= startOfMonth;
      }).length;
    }
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    loadUsers() {
      // In a real app, this would fetch users from the backend API
      // For now, we'll use mock data or data from localStorage
      try {
        // Check if we have mock users data
        const mockUsers = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user',
            status: 'active',
            createdAt: '2025-10-01T10:00:00Z',
            lastLogin: '2025-10-03T09:30:00Z'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'user',
            status: 'active',
            createdAt: '2025-09-28T14:22:00Z',
            lastLogin: '2025-10-02T18:15:00Z'
          },
          {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'user',
            status: 'inactive',
            createdAt: '2025-09-25T08:45:00Z',
            lastLogin: '2025-09-25T08:46:00Z'
          },
          {
            id: 4,
            name: 'Admin User',
            email: 'admin@test.com',
            role: 'admin',
            status: 'active',
            createdAt: '2025-01-15T12:00:00Z',
            lastLogin: '2025-10-03T10:15:00Z'
          }
        ];
        
        // Load current user data from localStorage if available
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          // Only add if not already in the mock data
          const exists = mockUsers.some(user => user.id === parsedUser.id);
          if (!exists) {
            mockUsers.push({
              ...parsedUser,
              id: parsedUser.id || (mockUsers.length + 1),
              role: parsedUser.role || 'user',
              status: 'active',
              createdAt: parsedUser.createdAt || new Date().toISOString()
            });
          }
        }
        
        this.users = mockUsers;
      } catch (error) {
        console.error('Error loading users:', error);
        this.showCustomAlert('Error loading users', 'error');
      }
    },
    viewUser(user) {
      this.selectedUser = user;
      this.showUserDetailModal = true;
    },
    editUser(user) { // eslint-disable-line no-unused-vars
      this.showCustomAlert('Function not implemented in this version', 'info');
    },
    deleteUser(userId) {
      if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
        // In a real app, this would call an API to delete the user
        this.users = this.users.filter(user => user.id !== userId);
        this.showCustomAlert('ลบผู้ใช้สำเร็จ', 'success');
      }
    },
    closeModal() {
      this.showUserDetailModal = false;
      this.selectedUser = null;
    }
  },
  created() {
    document.title = 'Netflix Clone - จัดการผู้ใช้';
    
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      this.$router.push('/login');
      return;
    }
    
    this.loadUsers();
  }
}
</script>

<style scoped>
.admin-users {
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  min-height: 100vh;
  padding: 20px;
  color: white;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.admin-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #e50914;
  font-size: 2.2rem;
  font-weight: 600;
}

.users-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(145deg, #222, #1a1a1a);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: #b3b3b3;
  font-weight: 500;
}

.stat-value {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #e50914;
}

.users-table-container {
  overflow-x: auto;
  background: linear-gradient(145deg, #222, #1a1a1a);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.users-table th,
.users-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.users-table th {
  background-color: #333;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.user {
  background-color: #007bff;
  color: white;
}

.role-badge.admin {
  background-color: #dc3545;
  color: white;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background-color: #28a745;
  color: white;
}

.status-badge.inactive {
  background-color: #6c757d;
  color: white;
}

.action-btn {
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.view-btn {
  background-color: #6c757d;
  color: white;
}

.view-btn:hover {
  background-color: #5a6268;
}

.edit-btn {
  background-color: #ffc107;
  color: #212529;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(145deg, #222, #1a1a1a);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  margin: 0;
  color: #e50914;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #e50914;
}

.modal-body {
  padding: 20px;
}

.user-info p {
  margin: 10px 0;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.user-info strong {
  color: #e50914;
}

/* Responsive design */
@media (max-width: 768px) {
  .users-stats {
    grid-template-columns: 1fr;
  }
  
  .admin-container {
    padding: 10px;
  }
  
  .users-table th,
  .users-table td {
    padding: 10px 8px;
    font-size: 0.9rem;
  }
  
  .action-btn {
    padding: 4px 6px;
    font-size: 0.7rem;
    margin: 2px;
  }
}
</style>
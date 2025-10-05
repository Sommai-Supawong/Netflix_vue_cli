<template>
  <div class="login">
    <div class="login-container">
      <h2>Sign In</h2>
      
      <!-- User/Admin selection -->
      <div class="auth-type-selector">
        <button 
          :class="['auth-type-btn', {'active': authType === 'user'}]" 
          @click="setAuthType('user')"
        >
          User Login
        </button>
        <button 
          :class="['auth-type-btn', {'active': authType === 'admin'}]" 
          @click="setAuthType('admin')"
        >
          Admin Login
        </button>
      </div>
      
      <!-- User login form -->
      <form v-if="authType === 'user'" @submit.prevent="handleUserLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" class="login-btn">Sign In</button>
        
        <div class="form-footer">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">Remember me</label>
          </div>
          <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
        </div>
      </form>
      
      <!-- Admin login form -->
      <form v-else @submit.prevent="handleAdminLogin" class="login-form">
        <div class="input-group">
          <label for="admin-username">Username</label>
          <input 
            type="text" 
            id="admin-username" 
            v-model="adminUsername" 
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="admin-password">Password</label>
          <input 
            type="password" 
            id="admin-password" 
            v-model="adminPassword" 
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" class="login-btn">Admin Sign In</button>
      </form>
      
      <div class="login-footer">
        <p v-if="authType === 'user'">
          New to Netflix Clone? 
          <router-link to="/register">Sign up now</router-link>
        </p>
        <p v-if="authType === 'user'">
          Use these credentials to login: Email: test@example.com | Password: 123456
        </p>
        <p v-if="authType === 'admin'">
          Use these credentials to login: Username: admin | Password: admin123
        </p>
      </div>
    </div>
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script>
import { setUserAuth } from '@/utils/userAuth';
import { setAdminAuth } from '@/utils/adminAuth';

export default {
  name: 'LoginPage',
  data() {
    return {
      authType: 'user', // 'user' or 'admin'
      email: '',
      password: '',
      rememberMe: false,
      adminUsername: '',
      adminPassword: ''
    }
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    setAuthType(type) {
      this.authType = type;
    },
    handleUserLogin() {
      // In a real app, this would send credentials to an API
      if (this.email === 'test@example.com' && this.password === '123456') {
        // Simulate successful login
        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);
        
        // Set user authentication
        setUserAuth(this.email, token, 'user');
        
        if (this.rememberMe) {
          localStorage.setItem('email', this.email);
        } else {
          localStorage.removeItem('email');
        }
        
        // Redirect to home page
        this.$router.push('/');
        this.showCustomAlert('Login successful!', 'success');
      } else {
        this.showCustomAlert('Invalid credentials. Please use test@example.com and 123456', 'error');
      }
    },
    handleAdminLogin() {
      // Check admin credentials
      if (this.adminUsername === 'admin' && this.adminPassword === 'admin123') {
        // Create token for admin
        const token = 'admin_' + btoa(this.adminUsername + ':' + Date.now());
        
        // Save admin authentication data
        setAdminAuth(this.adminUsername, token);
        
        // Redirect to admin dashboard
        this.$router.push('/admin/dashboard');
        this.showCustomAlert('Admin login successful!', 'success');
      } else {
        this.showCustomAlert('Invalid admin credentials. Username: admin, Password: admin123', 'error');
      }
    },
    forgotPassword() {
      this.showCustomAlert('Password reset functionality would go here', 'info');
    }
  },
  created() {
    document.title = 'Netflix Clone - Sign In';
    // Pre-fill email if "remember me" was checked
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }
}
</script>

<style scoped>
.login {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%), 
               url('https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e90-bf5d-7c3e43e2f8a9/3c8bf3c6-2a0d-4605-97b1-648e1ae6c53c/TH-en-20251003-popsignuptwoweeks-perspective_alpha_website_large.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
}

.login::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(229, 9, 20, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: -1;
}

.login-container {
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.85), rgba(20, 20, 20, 0.9)), 
               url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjEuNSIgZmlsbD0iIzMzMyIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+') repeat;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 28rem;
  color: white;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.login h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(to right, #e50914, #f0a8a5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 700;
}

.auth-type-selector {
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(51, 51, 51, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px;
}

.auth-type-btn {
  flex: 1;
  padding: 1rem;
  background: transparent;
  color: #ddd;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.auth-type-btn.active {
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
  font-weight: 600;
  border-radius: 8px;
}

.auth-type-btn:not(.active):hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.input-group {
  margin-bottom: 1.25rem;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #e5e5e5;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-group input {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(20, 20, 20, 0.6);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.input-group input:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.3);
  background: rgba(30, 30, 30, 0.7);
}

.login-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 6px 15px rgba(229, 9, 20, 0.4);
}

.login-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(229, 9, 20, 0.5);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  color: #b3b3b3;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remember-me input {
  width: auto;
}

.form-footer a {
  color: #b3b3b3;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-footer a:hover {
  color: #e50914;
  text-decoration: underline;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #b3b3b3;
}

.login-footer p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.login-footer a {
  color: #e50914;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #ff4757;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .login {
    padding: 1rem;
  }
  
  .login-container {
    padding: 1.75rem;
    margin: 1rem;
  }
  
  .form-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .auth-type-selector {
    flex-direction: column;
  }
  
  .login h2 {
    font-size: 1.5rem;
  }
}

/* Animation for input focus */
.input-group input:focus {
  animation: inputFocus 0.5s ease;
}

@keyframes inputFocus {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}

/* Animation for button hover */
.login-btn {
  animation: btnFloat 3s ease-in-out infinite;
}

@keyframes btnFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Reset button animation on hover */
.login-btn:hover {
  animation: none;
}
</style>
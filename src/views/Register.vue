<template>
  <div class="register">
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <label for="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            placeholder="Enter your full name"
            required
          />
        </div>
        
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
            minlength="6"
          />
        </div>
        
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            placeholder="Confirm your password"
            required
            minlength="6"
          />
        </div>
        
        <button type="submit" class="register-btn">Register</button>
      </form>
      
      <div class="register-footer">
        <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
      </div>
    </div>
    <CustomAlert ref="customAlert" />
  </div>
</template>

<script>
import CustomAlert from '@/components/CustomAlert.vue';

export default {
  name: 'RegisterPage',
  components: {
    CustomAlert
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    showCustomAlert(message, type = 'info') {
      this.$refs.customAlert.showAlert(message, type);
    },
    handleRegister() {
      // Validate passwords match
      if (this.password !== this.confirmPassword) {
        this.showCustomAlert('Passwords do not match', 'error');
        return;
      }
      
      // Validate password length
      if (this.password.length < 6) {
        this.showCustomAlert('Password must be at least 6 characters', 'error');
        return;
      }
      
      // In a real app, this would send registration data to an API
      // For now, we'll simulate a successful registration
      try {
        // Create mock user data
        const userData = {
          id: Date.now(), // In a real app, this would come from the backend
          name: this.name,
          email: this.email,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        
        // Save user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Simulate successful registration and login
        const token = 'user-token-' + Math.random().toString(36).substr(2, 9);
        
        // Set user authentication
        import('@/utils/userAuth').then(({ setUserAuth }) => {
          setUserAuth(this.email, token, 'user');
        });
        
        // Redirect to home page
        this.$router.push('/');
        this.showCustomAlert('Registration successful! Welcome to Netflix Clone.', 'success');
      } catch (error) {
        this.showCustomAlert('Registration failed. Please try again.', 'error');
      }
    }
  },
  created() {
    document.title = 'Netflix Clone - Register';
  }
}
</script>

<style scoped>
.register {
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

.register::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(229, 9, 20, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: -1;
}

.register-container {
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

.register h2 {
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

.register-btn {
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

.register-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(229, 9, 20, 0.5);
}

.register-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #b3b3b3;
}

.register-footer p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.register-footer a {
  color: #e50914;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-footer a:hover {
  color: #ff4757;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .register {
    padding: 1rem;
  }
  
  .register-container {
    padding: 1.75rem;
    margin: 1rem;
  }
  
  .register h2 {
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
.register-btn {
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
.register-btn:hover {
  animation: none;
}
</style>
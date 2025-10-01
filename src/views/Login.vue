<template>
  <div class="login">
    <div class="login-container">
      <h2>Sign In</h2>
      <form @submit.prevent="handleLogin" class="login-form">
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
      
      <div class="login-footer">
        <p>New to Netflix Clone? <router-link to="/register">Sign up now</router-link></p>
        <p>Use these credentials to login:</p>
        <p>Email: test@example.com | Password: 123456</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    }
  },
  methods: {
    handleLogin() {
      // In a real app, this would send credentials to an API
      if (this.email === 'test@example.com' && this.password === '123456') {
        // Simulate successful login
        const token = 'mock-token-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('token', token);
        
        if (this.rememberMe) {
          localStorage.setItem('email', this.email);
        } else {
          localStorage.removeItem('email');
        }
        
        // Redirect to home page
        this.$router.push('/');
        alert('Login successful!');
      } else {
        alert('Invalid credentials. Please use test@example.com and 123456');
      }
    },
    forgotPassword() {
      alert('Password reset functionality would go here');
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
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
               url('https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Login+Background') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-container {
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  color: white;
}

.login h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #8c8c8c;
  background-color: #333;
  color: white;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #f40612;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-footer a {
  color: #b3b3b3;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.9rem;
}

.login-footer p {
  margin-bottom: 10px;
}

.login-footer a {
  color: #e50914;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .form-footer {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
<template>
  <div class="redirect-page">
    <div class="redirect-container">
      <h2>Redirecting...</h2>
      <p>Redirecting to the login page. Please wait.</p>
      <p>If you are not redirected automatically, <a href="/login">click here</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  mounted() {
    // Redirect to unified login page
    this.$router.push('/login');
  }
}
</script>

<style scoped>
.redirect-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Background') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 20px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.redirect-container {
  text-align: center;
  background: linear-gradient(145deg, #222, #111);
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h2 {
  color: #e50914;
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

a {
  color: #e50914;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Background') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 20px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container {
  background: linear-gradient(145deg, #222, #111);
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #e50914;
  font-size: 28px;
  font-weight: 600;
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

.form-group input {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #444;
  background: linear-gradient(145deg, #333, #222);
  color: white;
  font-size: 16px;
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.form-group input:focus {
  outline: none;
  border-color: #e50914;
  box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.3), inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(145deg, #e50914, #b20710);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-btn:hover {
  background: linear-gradient(145deg, #b20710, #e50914);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  background: linear-gradient(145deg, #ff4757, #d63031);
  border-radius: 8px;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Sarabun', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

@media (max-width: 768px) {
  .login-container {
    padding: 30px 20px;
    margin: 20px;
  }
  
  h2 {
    font-size: 24px;
  }
}
</style>
/**
 * Utility functions for user authentication
 */

// Check if user is authenticated
export function isUserAuthenticated() {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  
  if (!token || !userData) {
    return false;
  }
  
  try {
    const parsedUserData = JSON.parse(userData);
    // Check if token is still valid (not expired)
    if (parsedUserData.expiresAt && Date.now() > parsedUserData.expiresAt) {
      // Token expired, remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return false;
  }
}

// Set user authentication
export function setUserAuth(email, token, role = 'user') {
  const userData = {
    email: email,
    role: role,
    createdAt: Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
  };
  
  localStorage.setItem('token', token);
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Clear user authentication
export function clearUserAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
}

// Get user data
export function getUserData() {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return null;
  }
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

// Get user role
export function getUserRole() {
  const userData = getUserData();
  if (userData && userData.role) {
    return userData.role;
  }
  return 'user'; // default role
}
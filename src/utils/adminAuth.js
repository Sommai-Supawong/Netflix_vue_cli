/**
 * Utility functions for admin authentication
 */

// Check if user is authenticated as admin
export function isAdminAuthenticated() {
  const adminToken = localStorage.getItem('adminToken');
  const adminData = localStorage.getItem('adminData');
  
  if (!adminToken || !adminData) {
    return false;
  }
  
  try {
    const parsedAdminData = JSON.parse(adminData);
    // Check if token is still valid (not expired)
    if (parsedAdminData.expiresAt && Date.now() > parsedAdminData.expiresAt) {
      // Token expired, remove from localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return false;
  }
}

// Set admin authentication
export function setAdminAuth(username, token) {
  const adminData = {
    username: username,
    role: 'admin',
    createdAt: Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
  };
  
  localStorage.setItem('adminToken', token);
  localStorage.setItem('adminData', JSON.stringify(adminData));
}

// Clear admin authentication
export function clearAdminAuth() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
}

// Get admin data
export function getAdminData() {
  const adminData = localStorage.getItem('adminData');
  if (!adminData) {
    return null;
  }
  
  try {
    return JSON.parse(adminData);
  } catch (error) {
    console.error('Error parsing admin data:', error);
    return null;
  }
}
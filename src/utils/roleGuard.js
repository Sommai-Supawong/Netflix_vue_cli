import { isAdminAuthenticated } from './adminAuth';
import { isUserAuthenticated, getUserRole } from './userAuth';

// Role-based guard for admin routes
export function roleBasedGuard(to, from, next) {
  // Check if user is authenticated as admin
  if (isAdminAuthenticated()) {
    next(); // Admin is authenticated, allow access
    return;
  }
  
  // Check if user is authenticated as regular user
  if (isUserAuthenticated()) {
    // For admin-specific routes, deny access to regular users
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
      // Redirect regular users away from admin routes
      next('/'); // or show an access denied page
      return;
    }
    next(); // Regular user is authenticated and accessing allowed route
    return;
  }
  
  // If not authenticated at all, redirect to login
  next('/login');
}

// Public guard to redirect authenticated users away from login page
export function publicGuard(to, from, next) {
  // Check if either admin or regular user is authenticated
  if (isAdminAuthenticated()) {
    // If admin is logged in, redirect to admin dashboard
    if (to.path === '/login') {
      next('/admin/dashboard');
    } else {
      next();
    }
    return;
  }
  
  if (isUserAuthenticated()) {
    // If regular user is logged in, redirect to home
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
    return;
  }
  
  // If not authenticated, allow access to login page
  next();
}

// Specific admin guard for admin routes that require admin authentication
export function adminGuard(to, from, next) {
  if (isAdminAuthenticated()) {
    // Admin is authenticated, allow access
    next();
  } else {
    // Admin is not authenticated, redirect to login (with admin context)
    next('/login');
  }
}

// Public guard for admin login
export function adminPublicGuard(to, from, next) {
  if (isAdminAuthenticated()) {
    // If admin is already logged in, redirect to dashboard
    next('/admin/dashboard');
  } else {
    // Allow access to login page
    next();
  }
}

// Check if current user has admin role
export function hasAdminRole() {
  return isAdminAuthenticated();
}

// Check if current user has specific role
export function hasRole(requiredRole) {
  if (isAdminAuthenticated()) {
    return requiredRole === 'admin';
  }
  
  if (isUserAuthenticated()) {
    const userRole = getUserRole();
    return userRole === requiredRole;
  }
  
  return false;
}
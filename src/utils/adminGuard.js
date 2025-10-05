import { isAdminAuthenticated } from './adminAuth';

// Navigation guard for admin routes
export function adminGuard(to, from, next) {
  if (isAdminAuthenticated()) {
    // Admin is authenticated, allow access
    next();
  } else {
    // Admin is not authenticated, redirect to admin login
    next('/admin/login');
  }
}

// Public guard to redirect logged-in admins away from login page
export function adminPublicGuard(to, from, next) {
  if (isAdminAuthenticated()) {
    // If admin is already logged in, redirect to dashboard
    next('/admin/dashboard');
  } else {
    // Allow access to login page
    next();
  }
}
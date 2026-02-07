import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetDetails from './pages/AssetDetails';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Layout from './components/Layout';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto"></div>
                    <p className="mt-4 text-muted-foreground font-medium">Loading system...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

/**
 * App Routes Component
 */
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="assets" element={<Assets />} />
                <Route path="assets/:id" element={<AssetDetails />} />
                <Route path="reports" element={<Reports />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

/**
 * Main App Component
 */
function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '16px',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 4000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </Router>
        </AuthProvider>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * ScrollToTop Component
 * Automatically scrolls the window to the top on route changes
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetDetails from './pages/AssetDetails';
// import Reports from './pages/Reports';
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
                {/* Luxury Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[150px] animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-48 h-48 mb-8 relative">
                        {/* Outer Pulse Rings */}
                        <div className="absolute inset-0 rounded-full border border-gold-500/20 animate-ping"></div>
                        <div className="absolute inset-4 rounded-full border border-gold-500/10 animate-ping-slow"></div>

                        {/* Logo Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-[2.5rem] p-1 shadow-2xl overflow-hidden backdrop-blur-xl border border-white/5 animate-logo-float">
                            <img
                                src="/princeton.jpg"
                                alt="Princeton"
                                className="w-full h-full object-contain scale-90"
                            />
                        </div>
                    </div>

                    <div className="text-center space-y-3">
                        <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Princeton</h2>
                        <div className="flex items-center gap-4 justify-center">
                            <div className="h-px w-8 bg-gold-500/30"></div>
                            <p className="text-gold-500 font-medium italic tracking-widest text-sm animate-pulse">
                                Feel the Difference!
                            </p>
                            <div className="h-px w-8 bg-gold-500/30"></div>
                        </div>
                    </div>

                    {/* Loading Progress Line */}
                    <div className="w-48 h-1 bg-white/5 rounded-full mt-12 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent w-full animate-loading-slide"></div>
                    </div>
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
                <Route path="assets/:category" element={<Assets />} />
                <Route path="assets/view/:id" element={<AssetDetails />} />
                {/* <Route path="reports" element={<Reports />} /> */}
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
                <ScrollToTop />
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

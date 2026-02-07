import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

/**
 * Auth Context
 * Manages authentication state across the application
 */

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = () => {
            const storedUser = authService.getStoredUser();
            if (storedUser) {
                setUser(storedUser);
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        setUser(response.data.user);
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        setUser(response.data.user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 * Custom hook to access auth context
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

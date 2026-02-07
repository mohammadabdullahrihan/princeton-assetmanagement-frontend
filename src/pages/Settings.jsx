import React from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
            </div>

            <div className="card">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gold-500 rounded-full"></span>
                    Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label text-muted-foreground mb-2 block">Name</label>
                        <input type="text" value={user?.name || ''} readOnly className="input !bg-muted/50 border-border cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="label text-muted-foreground mb-2 block">Email</label>
                        <input type="email" value={user?.email || ''} readOnly className="input !bg-muted/50 border-border cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="label text-muted-foreground mb-2 block">Role</label>
                        <input type="text" value={user?.role || ''} readOnly className="input !bg-muted/50 border-border cursor-not-allowed" />
                    </div>
                    {user?.department && (
                        <div>
                            <label className="label text-muted-foreground mb-2 block">Department</label>
                            <input type="text" value={user.department} readOnly className="input !bg-muted/50 border-border cursor-not-allowed" />
                        </div>
                    )}
                </div>
            </div>

            <div className="card">
                <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-gold-500 rounded-full"></span>
                    Authentication
                </h2>
                <div className="max-w-md space-y-6">
                    <div>
                        <label className="label text-muted-foreground mb-2 block">Current Password</label>
                        <input type="password" className="input" placeholder="Enter current password" />
                    </div>
                    <div>
                        <label className="label text-muted-foreground mb-2 block">New Password</label>
                        <input type="password" className="input" placeholder="Enter new password" />
                    </div>
                    <div>
                        <label className="label text-muted-foreground mb-2 block">Confirm New Password</label>
                        <input type="password" className="input" placeholder="Confirm new password" />
                    </div>
                    <button className="btn btn-primary w-full py-3">Update Security Credentials</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;

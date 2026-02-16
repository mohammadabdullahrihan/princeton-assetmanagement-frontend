import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    User,
    Shield,
    Mail,
    Smartphone,
    Globe,
    Save,
    Camera,
    Edit3,
    X
} from 'lucide-react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Local state for editing fields
    const [profile, setProfile] = useState({
        name: user?.name || 'Md. Nazmul Haider',
        email: user?.email || 'admin@princeton.com',
        designation: 'Managing Director',
        phone: user?.phone || '01712050304'
    });

    const handleSave = async () => {
        if (!user?._id && !user?.id) {
            toast.error("User session missing");
            return;
        }

        setIsSaving(true);
        try {
            const userId = user._id || user.id;
            const response = await authService.updateUser(userId, {
                name: profile.name,
                email: profile.email,
                department: profile.designation,
                phone: profile.phone
            });

            if (response.success) {
                updateUser(response.data.data); // Update AuthContext and LocalStorage
                setIsEditing(false);
                toast.success('Profile synchronized successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">Control Center</h1>
                    <p className="text-muted-foreground mt-1 font-medium">Manage your administrative identity and profile</p>
                </div>
                <div className="flex items-center gap-3">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-secondary px-8 py-3 flex items-center gap-2 group border-white/10 hover:border-gold-500/50"
                        >
                            <Edit3 className="w-4 h-4 group-hover:text-gold-500 transition-colors" />
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="btn btn-primary px-8 py-3 shadow-lg shadow-gold-500/20 flex items-center gap-2 group"
                            >
                                <Save className={`w-4 h-4 transition-transform ${isSaving ? 'animate-spin' : 'group-hover:scale-110'}`} />
                                {isSaving ? 'Syncing...' : 'Save Profile'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="card border-t-4 border-gold-500 shadow-2xl overflow-hidden">
                <div className="space-y-10">
                    {/* Horizontal Profile Hero */}
                    <div className="flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-border/10">
                        <div className="relative group">
                            {/* Proportional Avatar Size (w-44) */}
                            <div className="w-44 h-54 rounded-[1.5rem] bg-gradient-to-br from-gold-400 to-gold-600 p-1 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                                <div className="w-full h-full rounded-[1.3rem] bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/md-nazmul-haider.jpg"
                                        alt="Profile"
                                        className="w-full h-full object-contain object-top scale-[1.10] origin-top opacity-100 group-hover:scale-110 transition-all duration-700"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Md+Nazmul+Haider&background=EFB708&color=000&size=200&bold=true"; }}
                                    />
                                </div>
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 p-3 bg-white text-black rounded-2xl shadow-xl hover:bg-gold-500 transition-colors animate-bounce">
                                    <Camera className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="text-center md:text-left space-y-4">
                            <div>
                                <h3 className="text-3xl font-black text-white">Managing Director</h3>
                                <p className="text-gold-500 font-bold tracking-[0.2em] uppercase text-xs mt-1">{profile.designation} at Princeton Development Ltd.</p>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Shield className="w-3.5 h-3.5 text-gold-500" /> Administrative Access
                                </span>
                                <span className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                    <Globe className="w-3.5 h-3.5 text-gold-500" /> HQ Division
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                            <div className="relative group">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isEditing ? 'text-gold-500' : 'text-muted-foreground/30'}`} />
                                <input
                                    type="text"
                                    readOnly={!isEditing}
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className={`input pl-12 border-white/10 font-bold transition-all ${!isEditing ? 'bg-white/[0.02] opacity-70 cursor-not-allowed' : 'bg-white/5 focus:border-gold-500'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">Official Email Address</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isEditing ? 'text-gold-500' : 'text-muted-foreground/30'}`} />
                                <input
                                    type="email"
                                    readOnly={!isEditing}
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className={`input pl-12 border-white/10 font-bold transition-all ${!isEditing ? 'bg-white/[0.02] opacity-70 cursor-not-allowed' : 'bg-white/5 focus:border-gold-500'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">Current Designation</label>
                            <div className="relative group">
                                <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isEditing ? 'text-gold-500' : 'text-muted-foreground/30'}`} />
                                <input
                                    type="text"
                                    readOnly={!isEditing}
                                    value={profile.designation}
                                    onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                                    className={`input pl-12 border-white/10 font-bold transition-all ${!isEditing ? 'bg-white/[0.02] opacity-70 cursor-not-allowed' : 'bg-white/5 focus:border-gold-500'}`}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gold-500 uppercase tracking-[0.2em] ml-1">Contact Number</label>
                            <div className="relative group">
                                <Smartphone className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isEditing ? 'text-gold-500' : 'text-muted-foreground/30'}`} />
                                <input
                                    type="text"
                                    readOnly={!isEditing}
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className={`input pl-12 border-white/10 font-bold transition-all ${!isEditing ? 'bg-white/[0.02] opacity-70 cursor-not-allowed' : 'bg-white/5 focus:border-gold-500'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

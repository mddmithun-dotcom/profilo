// Step1PersonalInfo.jsx - Personal information form

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Link2, GitBranch, Video, Camera, AlertCircle } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const inputClass = "form-input font-[inherit] text-sm";

function FormField({ label, id, icon: Icon, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                {Icon && <Icon size={14} className="text-violet-400" />}
                {label}
            </label>
            {children}
            {error && (
                <p className="text-red-400 text-xs flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {error}
                </p>
            )}
        </div>
    );
}

export default function Step1PersonalInfo({ errors, onChange }) {
    const personalInfo = usePortfolioStore(s => s.personalInfo);
    const updatePersonalInfo = usePortfolioStore(s => s.updatePersonalInfo);
    const fileInputRef = useRef(null);

    const handleChange = (field) => (e) => {
        updatePersonalInfo({ [field]: e.target.value });
        onChange?.();
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            updatePersonalInfo({ photo: ev.target.result });
        };
        reader.readAsDataURL(file);
    };

    // Generate initials avatar
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
        >
            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    {personalInfo.photo ? (
                        <img
                            src={personalInfo.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                            style={{ background: 'linear-gradient(135deg, #6D28D9, #EC4899)' }}>
                            {initials}
                        </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={22} className="text-white" />
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                />
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors flex items-center gap-1.5"
                    >
                        <Camera size={14} />
                        {personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, GIF up to 5MB</p>
                </div>
            </div>

            {/* Required fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name *" id="fullName" icon={User} error={errors?.fullName}>
                    <input
                        id="fullName"
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Nishanthi S"
                        value={personalInfo.fullName}
                        onChange={handleChange('fullName')}
                        style={{ borderColor: errors?.fullName ? '#EF4444' : undefined }}
                    />
                </FormField>
                <FormField label="Email *" id="email" icon={Mail} error={errors?.email}>
                    <input
                        id="email"
                        type="email"
                        className={inputClass}
                        placeholder="e.g. nishanthi@example.com"
                        value={personalInfo.email}
                        onChange={handleChange('email')}
                        style={{ borderColor: errors?.email ? '#EF4444' : undefined }}
                    />
                </FormField>
            </div>

            <FormField label="About Me *" id="about" error={errors?.about}>
                <textarea
                    id="about"
                    rows={4}
                    className={inputClass}
                    placeholder="Tell the world about yourself — your passion, skills, and what drives you..."
                    value={personalInfo.about}
                    onChange={handleChange('about')}
                    style={{ resize: 'vertical', borderColor: errors?.about ? '#EF4444' : undefined }}
                />
            </FormField>

            {/* Optional fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Role / Title" id="role">
                    <input
                        id="role"
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Full-Stack Developer"
                        value={personalInfo.role}
                        onChange={handleChange('role')}
                    />
                </FormField>
                <FormField label="Tagline" id="tagline">
                    <input
                        id="tagline"
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Building the future 🚀"
                        value={personalInfo.tagline}
                        onChange={handleChange('tagline')}
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Location" id="location" icon={MapPin}>
                    <input
                        id="location"
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Chennai, India"
                        value={personalInfo.location}
                        onChange={handleChange('location')}
                    />
                </FormField>
                <FormField label="Phone" id="phone" icon={Phone}>
                    <input
                        id="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="e.g. +91 98765 43210"
                        value={personalInfo.phone}
                        onChange={handleChange('phone')}
                    />
                </FormField>
            </div>

            <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-3">Social Links (Optional)</p>
                <div className="flex flex-col gap-3">
                    <FormField label="LinkedIn URL" id="linkedin" icon={Link2}>
                        <input
                            id="linkedin"
                            type="url"
                            className={inputClass}
                            placeholder="https://linkedin.com/in/yourname"
                            value={personalInfo.linkedin}
                            onChange={handleChange('linkedin')}
                        />
                    </FormField>
                    <FormField label="GitHub URL" id="github" icon={GitBranch}>
                        <input
                            id="github"
                            type="url"
                            className={inputClass}
                            placeholder="https://github.com/yourname"
                            value={personalInfo.github}
                            onChange={handleChange('github')}
                        />
                    </FormField>
                    <FormField label="YouTube Channel" id="youtube" icon={Video}>
                        <input
                            id="youtube"
                            type="url"
                            className={inputClass}
                            placeholder="https://youtube.com/@yourname"
                            value={personalInfo.youtube}
                            onChange={handleChange('youtube')}
                        />
                    </FormField>
                </div>
            </div>
        </motion.div>
    );
}

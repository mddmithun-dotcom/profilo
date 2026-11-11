// pages/BuilderPage.jsx - The multi-step form builder

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, RotateCcw, Wand2, Sun, Moon, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import Step1PersonalInfo from '../components/forms/Step1PersonalInfo';
import Step2Education from '../components/forms/Step2Education';
import Step3Skills from '../components/forms/Step3Skills';
import Step4Projects from '../components/forms/Step4Projects';
import Step5Generate from '../components/forms/Step5Generate';
import usePortfolioStore from '../store/portfolioStore';

const STEP_TITLES = {
    1: { title: 'Personal Info', subtitle: "Let's start with who you are" },
    2: { title: 'Education', subtitle: 'Add your academic background' },
    3: { title: 'Skills', subtitle: 'Showcase your technical expertise' },
    4: { title: 'Projects', subtitle: 'Highlight your best work' },
    5: { title: 'Generate', subtitle: "You're almost there! Review & create" },
};

function validateStep(step, data) {
    const errors = {};
    if (step === 1) {
        if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
        if (!data.email?.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
        if (!data.about?.trim()) errors.about = 'Please write something about yourself';
    }
    return errors;
}

export default function BuilderPage() {
    const navigate = useNavigate();
    const currentStep = usePortfolioStore(s => s.currentStep);
    const setStep = usePortfolioStore(s => s.setStep);
    const nextStep = usePortfolioStore(s => s.nextStep);
    const prevStep = usePortfolioStore(s => s.prevStep);
    const personalInfo = usePortfolioStore(s => s.personalInfo);
    const resetAll = usePortfolioStore(s => s.resetAll);
    const fillDemoData = usePortfolioStore(s => s.fillDemoData);
    const theme = usePortfolioStore(s => s.theme);
    const toggleTheme = usePortfolioStore(s => s.toggleTheme);
    const isGenerated = usePortfolioStore(s => s.isGenerated);

    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);

    const handleNext = () => {
        if (currentStep === 1) {
            const errs = validateStep(1, personalInfo);
            if (Object.keys(errs).length > 0) {
                setErrors(errs);
                return;
            }
        }
        setErrors({});
        nextStep();
    };

    const isLight = theme === 'light';

    return (
        <div
            className="min-h-screen font-[Inter,Poppins,sans-serif] transition-colors duration-300"
            style={{
                background: isLight
                    ? 'linear-gradient(135deg, #F3F0FF 0%, #EEF2FF 50%, #F0F9FF 100%)'
                    : '#0B0B1A',
                color: isLight ? '#1E1B4B' : '#F1F5F9',
            }}
        >
            {/* Header */}
            <header
                className="sticky top-0 z-30 border-b transition-all duration-300"
                style={{
                    background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(11,11,26,0.85)',
                    backdropFilter: 'blur(16px)',
                    borderColor: isLight ? 'rgba(109,40,217,0.15)' : 'rgba(255,255,255,0.08)',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)' }}>
                            <Code2 size={20} className="text-white" />
                        </div>
                        <div>
                            <div className="font-extrabold text-sm" style={{ color: isLight ? '#6D28D9' : '#C4B5FD' }}>
                                Portfolio Builder
                            </div>
                            <div className="text-xs" style={{ color: isLight ? '#7C3AED' : '#64748B' }}>
                                Create Your Professional Portfolio in Minutes
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            onClick={fillDemoData}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                            style={{
                                background: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(139,92,246,0.1)',
                                color: '#8B5CF6',
                                border: '1px solid rgba(139,92,246,0.25)',
                            }}
                        >
                            <Wand2 size={13} />
                            Fill Demo Data
                        </motion.button>

                        {isGenerated && (
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                onClick={() => navigate('/portfolio')}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
                                style={{ background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)', color: '#fff' }}
                            >
                                <ExternalLink size={13} />
                                View Portfolio
                            </motion.button>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl transition-all"
                            style={{
                                background: isLight ? 'rgba(109,40,217,0.08)' : 'rgba(255,255,255,0.07)',
                                color: isLight ? '#6D28D9' : '#94A3B8',
                            }}
                            aria-label="Toggle theme"
                        >
                            {isLight ? <Moon size={16} /> : <Sun size={16} />}
                        </button>

                        <button
                            onClick={() => { if (confirm('Reset all data?')) resetAll(); }}
                            className="p-2 rounded-xl transition-all"
                            style={{
                                background: isLight ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.08)',
                                color: '#EF4444',
                            }}
                            aria-label="Reset"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    {/* Form card */}
                    <div className="xl:col-span-3">
                        <div
                            className="rounded-2xl p-6 sm:p-8 transition-all duration-300"
                            style={{
                                background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.04)',
                                border: isLight ? '1px solid rgba(109,40,217,0.15)' : '1px solid rgba(255,255,255,0.08)',
                                boxShadow: isLight ? '0 8px 40px rgba(109,40,217,0.08)' : '0 8px 40px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Step header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-extrabold" style={{ color: isLight ? '#1E1B4B' : '#F1F5F9' }}>
                                    {STEP_TITLES[currentStep].title}
                                </h2>
                                <p className="text-sm mt-1" style={{ color: isLight ? '#6B7280' : '#64748B' }}>
                                    {STEP_TITLES[currentStep].subtitle}
                                </p>
                            </div>

                            <Stepper currentStep={currentStep} />

                            <AnimatePresence mode="wait">
                                <div key={currentStep}>
                                    {currentStep === 1 && (
                                        <Step1PersonalInfo errors={errors} onChange={() => setErrors({})} />
                                    )}
                                    {currentStep === 2 && <Step2Education />}
                                    {currentStep === 3 && <Step3Skills />}
                                    {currentStep === 4 && <Step4Projects />}
                                    {currentStep === 5 && (
                                        <Step5Generate onEditStep={(step) => setStep(step)} />
                                    )}
                                </div>
                            </AnimatePresence>

                            {/* Navigation buttons (not on step 5) */}
                            {currentStep < 5 && (
                                <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: isLight ? '#E5E7EB' : 'rgba(255,255,255,0.08)' }}>
                                    <motion.button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                                        whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
                                        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        style={{
                                            background: isLight ? '#F3F4F6' : 'rgba(255,255,255,0.07)',
                                            color: isLight ? '#374151' : '#94A3B8',
                                            border: isLight ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    >
                                        ← Back
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={handleNext}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="gradient-btn px-6 py-2.5 rounded-xl text-sm font-semibold min-w-[44px] min-h-[44px]"
                                    >
                                        {currentStep === 4 ? 'Review →' : 'Next →'}
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Live preview panel (desktop) */}
                    <div className="xl:col-span-2 hidden xl:block">
                        <div
                            className="sticky top-24 rounded-2xl overflow-hidden"
                            style={{
                                background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                                border: isLight ? '1px solid rgba(109,40,217,0.12)' : '1px solid rgba(255,255,255,0.07)',
                                boxShadow: isLight ? '0 8px 40px rgba(109,40,217,0.06)' : '0 8px 40px rgba(0,0,0,0.3)',
                            }}
                        >
                            <div
                                className="px-4 py-3 border-b flex items-center justify-between"
                                style={{ borderColor: isLight ? '#E5E7EB' : 'rgba(255,255,255,0.08)' }}
                            >
                                <span className="text-sm font-semibold" style={{ color: isLight ? '#374151' : '#94A3B8' }}>
                                    Live Preview
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                </div>
                            </div>
                            <LivePreviewWrapper isLight={isLight} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Wrapper to give LivePreview reactive store access
function LivePreviewWrapper({ isLight }) {
    const personalInfo = usePortfolioStore(s => s.personalInfo);
    const skills = usePortfolioStore(s => s.skills);
    const projects = usePortfolioStore(s => s.projects);
    return <LivePreview data={{ personalInfo, skills, projects }} isLight={isLight} />;
}

// Compact live preview component
function LivePreview({ data, isLight }) {
    const { personalInfo, skills, projects } = data;
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    return (
        <div className="p-4 overflow-y-auto max-h-[75vh]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Mini hero */}
            <div className="flex flex-col items-center text-center py-6 px-2 rounded-xl mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.15), rgba(236,72,153,0.15))' }}>
                {personalInfo.photo ? (
                    <img src={personalInfo.photo} alt="photo" className="w-16 h-16 rounded-full object-cover border-2 border-violet-500 mb-3" />
                ) : (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3"
                        style={{ background: 'linear-gradient(135deg, #6D28D9, #EC4899)', border: '2px solid #8B5CF6' }}>
                        {initials}
                    </div>
                )}
                <div className="font-bold text-sm" style={{ color: '#A78BFA' }}>
                    {personalInfo.fullName || 'Your Name'}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                    {personalInfo.tagline || personalInfo.role || 'Your tagline...'}
                </div>
            </div>

            {/* About preview */}
            {personalInfo.about && (
                <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-violet-500">About</div>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#94A3B8' }}>
                        {personalInfo.about}
                    </p>
                </div>
            )}

            {/* Skills preview */}
            {skills && skills.length > 0 && (
                <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-violet-500">Skills</div>
                    <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 8).map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}>
                                {s}
                            </span>
                        ))}
                        {skills.length > 8 && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#64748B' }}>+{skills.length - 8}</span>
                        )}
                    </div>
                </div>
            )}

            {/* Projects preview */}
            {projects && projects.length > 0 && (
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-violet-500">Projects</div>
                    <div className="flex flex-col gap-2">
                        {projects.slice(0, 2).map(p => (
                            <div key={p.id} className="p-2.5 rounded-lg text-xs"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)' }}>
                                <div className="font-semibold text-slate-300">{p.title}</div>
                                <div className="line-clamp-1 text-slate-500 mt-0.5">{p.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!personalInfo.fullName && !personalInfo.about && (
                <div className="text-center py-6 text-slate-600 text-xs">
                    Fill in the form to see your portfolio preview here ✨
                </div>
            )}
        </div>
    );
}

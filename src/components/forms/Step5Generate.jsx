// Step5Generate.jsx - Review summary and generate button

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, GraduationCap, Zap, FolderOpen, Edit, ChevronRight, Palette } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const TEMPLATES = [
    {
        id: 'purple-dark',
        name: 'Purple Dark',
        desc: 'Dark glassmorphism with violet glow',
        preview: ['#0B0B1A', '#6D28D9', '#8B5CF6'],
    },
    {
        id: 'minimal-light',
        name: 'Minimal Light',
        desc: 'Clean & professional light theme',
        preview: ['#F8F9FA', '#6D28D9', '#7C3AED'],
    },
    {
        id: 'gradient-blue',
        name: 'Gradient Blue',
        desc: 'Dark oceanic blue with cyan accents',
        preview: ['#0A0F2E', '#3B82F6', '#06B6D4'],
    },
];

function ReviewSection({ icon: Icon, title, count, onEdit, stepId }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>
                    <Icon size={16} className="text-violet-400" />
                </div>
                <div>
                    <div className="text-sm font-semibold text-slate-200">{title}</div>
                    <div className="text-xs text-slate-500">{count}</div>
                </div>
            </div>
            <button
                type="button"
                onClick={() => onEdit(stepId)}
                className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-violet-500/10"
            >
                <Edit size={12} />
                Edit
                <ChevronRight size={12} />
            </button>
        </div>
    );
}

export default function Step5Generate({ onEditStep }) {
    const navigate = useNavigate();
    const personalInfo = usePortfolioStore(s => s.personalInfo);
    const education = usePortfolioStore(s => s.education);
    const skills = usePortfolioStore(s => s.skills);
    const projects = usePortfolioStore(s => s.projects);
    const template = usePortfolioStore(s => s.template);
    const setTemplate = usePortfolioStore(s => s.setTemplate);
    const setIsGenerated = usePortfolioStore(s => s.setIsGenerated);

    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        // Simulate a brief "building" animation
        await new Promise(r => setTimeout(r, 1800));
        setIsGenerated(true);
        navigate('/portfolio');
        setLoading(false);
    };

    const isReady = personalInfo.fullName && personalInfo.email && personalInfo.about;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
        >
            {/* Summary */}
            <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Review Your Portfolio</p>
                <div className="flex flex-col gap-2">
                    <ReviewSection
                        icon={User}
                        title="Personal Info"
                        count={personalInfo.fullName ? `${personalInfo.fullName} · ${personalInfo.email}` : 'Not filled'}
                        onEdit={onEditStep}
                        stepId={1}
                    />
                    <ReviewSection
                        icon={GraduationCap}
                        title="Education"
                        count={education.length > 0 ? `${education.length} entr${education.length === 1 ? 'y' : 'ies'}` : 'No entries'}
                        onEdit={onEditStep}
                        stepId={2}
                    />
                    <ReviewSection
                        icon={Zap}
                        title="Skills"
                        count={skills.length > 0 ? `${skills.length} skills added` : 'No skills added'}
                        onEdit={onEditStep}
                        stepId={3}
                    />
                    <ReviewSection
                        icon={FolderOpen}
                        title="Projects"
                        count={projects.length > 0 ? `${projects.length} project${projects.length === 1 ? '' : 's'}` : 'No projects'}
                        onEdit={onEditStep}
                        stepId={4}
                    />
                </div>
            </div>

            {/* Template selection */}
            <div>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Palette size={14} className="text-violet-400" />
                    Choose Template
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TEMPLATES.map(tmpl => (
                        <motion.button
                            key={tmpl.id}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setTemplate(tmpl.id)}
                            className="p-3 rounded-xl border-2 transition-all text-left"
                            style={{
                                borderColor: template === tmpl.id ? '#8B5CF6' : 'rgba(255,255,255,0.1)',
                                background: template === tmpl.id ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                                boxShadow: template === tmpl.id ? '0 0 20px rgba(139,92,246,0.2)' : 'none',
                            }}
                        >
                            {/* Color swatches */}
                            <div className="flex gap-1.5 mb-2">
                                {tmpl.preview.map((c, i) => (
                                    <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: c, border: '2px solid rgba(255,255,255,0.2)' }} />
                                ))}
                            </div>
                            <div className="font-semibold text-sm text-slate-200">{tmpl.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{tmpl.desc}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Validation warnings */}
            {!isReady && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                    <p className="text-amber-400 text-sm font-medium">⚠️ Complete required fields first</p>
                    <p className="text-amber-300/70 text-xs mt-1">Full Name, Email, and About Me are required to generate the portfolio.</p>
                </div>
            )}

            {/* Generate button */}
            <motion.button
                type="button"
                disabled={!isReady || loading}
                onClick={handleGenerate}
                whileHover={isReady && !loading ? { scale: 1.02 } : {}}
                whileTap={isReady && !loading ? { scale: 0.98 } : {}}
                className="relative w-full py-4 rounded-2xl font-bold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                style={{
                    background: isReady ? 'linear-gradient(135deg, #6D28D9, #8B5CF6, #EC4899)' : '#374151',
                    boxShadow: isReady ? '0 8px 40px rgba(109,40,217,0.5)' : 'none',
                }}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Building your portfolio...
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <Sparkles size={22} />
                        ✨ Generate Portfolio →
                    </div>
                )}
                {/* Shimmer effect */}
                {isReady && !loading && (
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
}

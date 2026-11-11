// pages/PortfolioPage.jsx - The generated, live, full-page portfolio

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Download, Copy, Check } from 'lucide-react';
import usePortfolioStore from '../store/portfolioStore';
import PortfolioNavBar from '../components/portfolio/NavBar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import { downloadPortfolioHTML } from '../utils/exportHtml';

// Theme definitions
const THEMES = {
    'purple-dark': {
        bg: '#0B0B1A',
        surface: 'rgba(255,255,255,0.04)',
        primary: '#8B5CF6',
        text: '#F1F5F9',
        muted: '#94A3B8',
        border: 'rgba(139,92,246,0.2)',
        accent: '#EC4899',
        navBg: 'rgba(11,11,26,0.88)',
        name: 'Purple Dark',
    },
    'minimal-light': {
        bg: '#F8F7FF',
        surface: 'rgba(255,255,255,0.9)',
        primary: '#6D28D9',
        text: '#1E1B4B',
        muted: '#64748B',
        border: '#E2E8F0',
        accent: '#7C3AED',
        navBg: 'rgba(248,247,255,0.92)',
        name: 'Minimal Light',
    },
    'gradient-blue': {
        bg: '#060B25',
        surface: 'rgba(255,255,255,0.05)',
        primary: '#3B82F6',
        text: '#EFF6FF',
        muted: '#93C5FD',
        border: 'rgba(59,130,246,0.25)',
        accent: '#06B6D4',
        navBg: 'rgba(6,11,37,0.9)',
        name: 'Gradient Blue',
    },
};

const TEMPLATE_NAMES = {
    'purple-dark': { label: 'Purple Dark', colors: ['#6D28D9', '#8B5CF6'] },
    'minimal-light': { label: 'Light Theme', colors: ['#F8F7FF', '#6D28D9'] },
    'gradient-blue': { label: 'Ocean Blue', colors: ['#3B82F6', '#06B6D4'] },
};

export default function PortfolioPage() {
    const navigate = useNavigate();
    const isGenerated = usePortfolioStore(s => s.isGenerated);
    const personalInfo = usePortfolioStore(s => s.personalInfo);
    const education = usePortfolioStore(s => s.education);
    const skills = usePortfolioStore(s => s.skills);
    const projects = usePortfolioStore(s => s.projects);
    const templateKey = usePortfolioStore(s => s.template);
    const setTemplate = usePortfolioStore(s => s.setTemplate);

    const [copied, setCopied] = useState(false);
    const [showToolbar, setShowToolbar] = useState(true);

    // Redirect if no portfolio data
    useEffect(() => {
        if (!isGenerated || !personalInfo.fullName) {
            navigate('/');
        }
    }, [isGenerated, personalInfo.fullName, navigate]);

    // Update page title dynamically
    useEffect(() => {
        if (personalInfo.fullName) {
            document.title = `${personalInfo.fullName} | Portfolio`;
        }
        return () => { document.title = 'Portfolio Builder'; };
    }, [personalInfo.fullName]);

    const data = { personalInfo, education, skills, projects };
    const theme = THEMES[templateKey] || THEMES['purple-dark'];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    const handleDownload = () => {
        downloadPortfolioHTML(data, templateKey);
    };

    const cycleTemplate = () => {
        const keys = Object.keys(TEMPLATE_NAMES);
        const currentIdx = keys.indexOf(templateKey);
        const next = keys[(currentIdx + 1) % keys.length];
        setTemplate(next);
    };

    if (!isGenerated || !personalInfo.fullName) return null;

    return (
        <div
            style={{
                background: theme.bg,
                minHeight: '100vh',
                fontFamily: 'Inter, Poppins, sans-serif',
                color: theme.text,
                transition: 'all 0.4s ease',
            }}
        >
            {/* Portfolio Navbar */}
            <PortfolioNavBar data={data} theme={theme} />

            {/* Floating toolbar */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
            >
                {/* Collapse toggle */}
                <button
                    onClick={() => setShowToolbar(v => !v)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all text-white text-xs font-bold"
                    style={{ background: 'rgba(109,40,217,0.9)', backdropFilter: 'blur(8px)' }}
                    aria-label="Toggle toolbar"
                >
                    {showToolbar ? '›' : '‹'}
                </button>

                <AnimatePresence>
                    {showToolbar && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col gap-2"
                        >
                            <ToolbarBtn onClick={() => navigate('/')} label="Edit Again">
                                <Edit3 size={15} />
                            </ToolbarBtn>

                            <ToolbarBtn onClick={handleDownload} label="Download HTML">
                                <Download size={15} />
                            </ToolbarBtn>

                            <ToolbarBtn onClick={handleCopyLink} label={copied ? 'Copied!' : 'Copy Link'}>
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                            </ToolbarBtn>

                            <ToolbarBtn onClick={cycleTemplate} label={`Theme: ${TEMPLATE_NAMES[templateKey]?.label}`}>
                                <div className="flex gap-0.5">
                                    {TEMPLATE_NAMES[templateKey]?.colors.map((c, i) => (
                                        <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, border: '1px solid rgba(255,255,255,0.3)' }} />
                                    ))}
                                </div>
                            </ToolbarBtn>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* All portfolio sections */}
            <HeroSection data={data} theme={theme} />
            <AboutSection data={data} theme={theme} />
            <SkillsSection data={data} theme={theme} />
            <ProjectsSection data={data} theme={theme} />
            <ContactSection data={data} theme={theme} />
            <Footer data={data} theme={theme} />
        </div>
    );
}

// Tooltip toolbar button
function ToolbarBtn({ onClick, label, children }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="relative flex items-center">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg text-white"
                style={{
                    background: 'rgba(30,20,60,0.92)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(139,92,246,0.35)',
                }}
                aria-label={label}
            >
                {children}
            </motion.button>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="absolute right-12 whitespace-nowrap text-xs px-2.5 py-1.5 rounded-lg font-medium pointer-events-none"
                        style={{
                            background: 'rgba(20,15,40,0.97)',
                            color: '#C4B5FD',
                            border: '1px solid rgba(139,92,246,0.4)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                        }}
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

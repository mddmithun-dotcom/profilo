// portfolio/NavBar.jsx - Smooth-scroll navbar with mobile hamburger

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function PortfolioNavBar({ data, theme: t }) {
    const { personalInfo, skills, projects } = data;
    const firstName = personalInfo.fullName?.split(' ')[0] || 'Portfolio';
    const firstLetter = firstName[0]?.toUpperCase() || 'P';

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            // Find active section
            const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const el = document.getElementById(sectionIds[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(sectionIds[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Filter nav items based on available data
    const visibleItems = NAV_ITEMS.filter(item => {
        if (item.label === 'Skills' && (!skills || skills.length === 0)) return false;
        if (item.label === 'Projects' && (!projects || projects.length === 0)) return false;
        return true;
    });

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled ? t.navBg : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 no-underline">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-sm"
                            style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})` }}
                        >
                            {firstLetter}
                        </div>
                        <span className="font-bold text-sm" style={{ color: t.text }}>
                            {personalInfo.fullName || 'Portfolio'}
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {visibleItems.map(item => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={e => handleNavClick(e, item.href)}
                                className="relative text-sm font-medium transition-colors pb-0.5"
                                style={{ color: activeSection === item.href.replace('#', '') ? t.primary : t.muted, textDecoration: 'none' }}
                            >
                                {item.label}
                                <span
                                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full transition-transform duration-300"
                                    style={{
                                        background: t.primary,
                                        transform: activeSection === item.href.replace('#', '') ? 'scaleX(1)' : 'scaleX(0)',
                                        transformOrigin: 'left',
                                    }}
                                />
                            </a>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-xl transition-colors"
                        style={{ color: t.text, background: `${t.surface}` }}
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 p-4"
                        style={{ background: t.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}` }}
                    >
                        <div className="flex flex-col gap-1">
                            {visibleItems.map(item => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={e => handleNavClick(e, item.href)}
                                    className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                                    style={{
                                        color: activeSection === item.href.replace('#', '') ? t.primary : t.text,
                                        background: activeSection === item.href.replace('#', '') ? `${t.primary}18` : 'transparent',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

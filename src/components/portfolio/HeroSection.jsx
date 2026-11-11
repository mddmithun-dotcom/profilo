// portfolio/HeroSection.jsx - Portfolio hero with typing effect

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

function useTypingEffect(text, speed = 60) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                setDone(true);
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return { displayed, done };
}

export default function HeroSection({ data, theme }) {
    const { personalInfo, projects } = data;
    const tagline = personalInfo.tagline || personalInfo.role || 'Developer & Creator';
    const { displayed, done } = useTypingEffect(tagline, 50);

    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'PB';

    const t = theme;

    return (
        <section
            id="home"
            className="min-h-screen flex items-center relative overflow-hidden"
            style={{ paddingTop: '80px' }}
        >
            {/* Glow blobs */}
            <div
                className="glow-blob w-[500px] h-[500px] -left-40 top-20"
                style={{ background: t.primary }}
            />
            <div
                className="glow-blob w-[400px] h-[400px] right-0 bottom-10"
                style={{ background: t.accent, animationDelay: '3s' }}
            />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                {/* Text side */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex-1 text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                        style={{ background: `${t.primary}22`, color: t.primary, border: `1px solid ${t.primary}44` }}
                    >
                        ✦ Welcome to my Portfolio
                    </motion.div>

                    <p className="text-lg font-medium mb-2" style={{ color: t.muted }}>Hello, I'm</p>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
                        style={{
                            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {personalInfo.fullName || 'Your Name'}
                    </motion.h1>

                    <div
                        className="text-xl sm:text-2xl font-medium mb-8 min-h-[2rem]"
                        style={{ color: t.muted }}
                    >
                        {displayed}
                        {!done && <span className="typing-cursor" />}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        {projects.length > 0 && (
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white shadow-xl"
                                style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, boxShadow: `0 8px 30px ${t.primary}55` }}
                            >
                                View My Projects <ArrowRight size={18} />
                            </motion.a>
                        )}
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all"
                            style={{ border: `2px solid ${t.primary}`, color: t.primary, background: `${t.primary}11` }}
                        >
                            Contact Me <Mail size={18} />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Photo side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative flex-shrink-0"
                >
                    {/* Blob behind photo */}
                    <div
                        className="absolute inset-0 rounded-full scale-125 blur-3xl opacity-40"
                        style={{ background: `radial-gradient(circle, ${t.primary}, ${t.accent})` }}
                    />
                    {/* Rotating ring */}
                    <motion.div
                        className="absolute inset-[-18px] rounded-full border-2 border-dashed"
                        style={{ borderColor: `${t.primary}55` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Photo or initials */}
                    {personalInfo.photo ? (
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full object-cover"
                            style={{ border: `4px solid ${t.primary}`, boxShadow: `0 0 60px ${t.primary}55` }}
                        />
                    ) : (
                        <div
                            className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center text-6xl font-extrabold text-white"
                            style={{
                                background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                                border: `4px solid ${t.primary}`,
                                boxShadow: `0 0 60px ${t.primary}55`,
                            }}
                        >
                            {initials}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

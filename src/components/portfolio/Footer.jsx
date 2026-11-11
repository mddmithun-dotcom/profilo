// portfolio/Footer.jsx

import { motion } from 'framer-motion';
import { Link2, GitBranch, Video } from 'lucide-react';

const SOCIAL_ICONS = [
    { key: 'linkedin', icon: Link2, label: 'LinkedIn' },
    { key: 'github', icon: GitBranch, label: 'GitHub' },
    { key: 'youtube', icon: Video, label: 'YouTube' },
];

export default function Footer({ data, theme: t }) {
    const { personalInfo } = data;
    const year = new Date().getFullYear();

    const socialLinks = SOCIAL_ICONS.filter(s => personalInfo[s.key]);

    return (
        <footer
            className="py-10 px-4 sm:px-8 text-center border-t"
            style={{ background: t.navBg, borderColor: t.border }}
        >
            {/* Social icons */}
            {socialLinks.length > 0 && (
                <div className="flex items-center justify-center gap-4 mb-5">
                    {socialLinks.map(({ key, icon: Icon, label }) => (
                        <motion.a
                            key={key}
                            href={personalInfo[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                            style={{ background: `${t.primary}22`, color: t.muted }}
                        >
                            <Icon size={18} />
                        </motion.a>
                    ))}
                </div>
            )}

            <p className="text-sm" style={{ color: t.muted }}>
                © {year} <span style={{ color: t.primary, fontWeight: 600 }}>{personalInfo.fullName}</span>. All rights reserved.
            </p>
            <p className="text-xs mt-1" style={{ color: `${t.muted}77` }}>
                Built with Portfolio Builder ✨
            </p>
        </footer>
    );
}

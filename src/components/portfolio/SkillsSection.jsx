// portfolio/SkillsSection.jsx

import { motion } from 'framer-motion';
import { getSkillData } from '../../utils/skillIcons';

export default function SkillsSection({ data, theme: t }) {
    const { skills } = data;
    if (!skills || skills.length === 0) return null;

    return (
        <section
            id="skills"
            className="py-24 px-4 sm:px-8"
            style={{ background: t.surface !== 'transparent' ? `${t.surface}` : undefined }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.primary }}>✦ What I Know</div>
                    <h2 className="text-4xl font-extrabold relative inline-block" style={{ color: t.text }}>
                        Skills & Technologies
                        <div className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full" style={{ background: `linear-gradient(to right, ${t.primary}, ${t.accent})` }} />
                    </h2>
                </motion.div>

                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => {
                        const sd = getSkillData(skill);
                        return (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04, duration: 0.3 }}
                                whileHover={{ scale: 1.08, y: -3 }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm cursor-default select-none"
                                style={{
                                    background: sd.bg,
                                    color: sd.color,
                                    border: `1.5px solid ${sd.color}55`,
                                    boxShadow: `0 2px 12px ${sd.color}22`,
                                }}
                            >
                                <span className="text-base">{sd.icon}</span>
                                <span>{sd.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

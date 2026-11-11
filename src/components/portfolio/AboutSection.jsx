// portfolio/AboutSection.jsx

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, GraduationCap } from 'lucide-react';

function useScrollAnimation() {
    return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6 },
    };
}

function InfoRow({ icon: Icon, label, value, theme }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${theme.primary}22` }}>
                <Icon size={15} style={{ color: theme.primary }} />
            </div>
            <div>
                <div className="text-xs uppercase tracking-wider font-medium" style={{ color: theme.muted }}>{label}</div>
                <div className="font-medium text-sm mt-0.5" style={{ color: theme.text }}>{value}</div>
            </div>
        </div>
    );
}

export default function AboutSection({ data, theme: t }) {
    const { personalInfo, education } = data;
    const anim = useScrollAnimation();

    return (
        <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <motion.div {...anim} className="mb-12">
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.primary }}>✦ Get To Know Me</div>
                <h2 className="text-4xl font-extrabold relative inline-block" style={{ color: t.text }}>
                    About Me
                    <div className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full" style={{ background: `linear-gradient(to right, ${t.primary}, ${t.accent})` }} />
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Main text */}
                <motion.div {...{ ...anim, transition: { ...anim.transition, delay: 0.1 } }} className="lg:col-span-3">
                    <p className="text-lg leading-relaxed" style={{ color: t.muted }}>
                        {personalInfo.about}
                    </p>

                    {/* Education subsection */}
                    {education.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: t.text }}>
                                <GraduationCap size={20} style={{ color: t.primary }} />
                                Education
                            </h3>
                            <div className="flex flex-col gap-4">
                                {education.map((edu, i) => (
                                    <motion.div
                                        key={edu.id || i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 rounded-xl relative overflow-hidden"
                                        style={{ background: t.surface, border: `1px solid ${t.border}` }}
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: `linear-gradient(to bottom, ${t.primary}, ${t.accent})` }} />
                                        <div className="pl-3">
                                            <div className="font-bold text-base" style={{ color: t.primary }}>{edu.degree}</div>
                                            <div className="font-medium mt-0.5" style={{ color: t.text }}>{edu.college}</div>
                                            <div className="text-sm mt-1" style={{ color: t.muted }}>
                                                {[edu.year, edu.cgpa ? `CGPA/Score: ${edu.cgpa}` : ''].filter(Boolean).join(' · ')}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Info sidebar */}
                <motion.div {...{ ...anim, transition: { ...anim.transition, delay: 0.2 } }} className="lg:col-span-2 flex flex-col gap-3">
                    <InfoRow icon={MapPin} label="Location" value={personalInfo.location} theme={t} />
                    <InfoRow icon={Mail} label="Email" value={personalInfo.email} theme={t} />
                    <InfoRow icon={Phone} label="Phone" value={personalInfo.phone} theme={t} />
                    {education[0]?.degree && (
                        <InfoRow icon={GraduationCap} label="Degree" value={education[0].degree} theme={t} />
                    )}
                </motion.div>
            </div>
        </section>
    );
}

// portfolio/ProjectsSection.jsx

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function ProjectsSection({ data, theme: t }) {
    const { projects } = data;
    if (!projects || projects.length === 0) return null;

    return (
        <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.primary }}>✦ My Work</div>
                <h2 className="text-4xl font-extrabold relative inline-block" style={{ color: t.text }}>
                    Projects
                    <div className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full" style={{ background: `linear-gradient(to right, ${t.primary}, ${t.accent})` }} />
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id || i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="relative rounded-2xl overflow-hidden flex flex-col group"
                        style={{
                            background: t.surface,
                            border: `1px solid ${t.border}`,
                            boxShadow: `0 4px 24px rgba(0,0,0,0.2)`,
                            transition: 'box-shadow 0.3s ease',
                        }}
                    >
                        {/* Project image */}
                        {project.image ? (
                            <div className="overflow-hidden h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div
                                className="h-48 flex items-center justify-center text-5xl"
                                style={{ background: `linear-gradient(135deg, ${t.primary}44, ${t.accent}44)` }}
                            >
                                📁
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            {project.category && (
                                <div
                                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                                    style={{ color: t.primary }}
                                >
                                    {project.category}
                                </div>
                            )}
                            <h3 className="font-bold text-lg mb-2" style={{ color: t.text }}>
                                {project.title}
                            </h3>
                            <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: t.muted }}>
                                {project.description}
                            </p>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-semibold w-fit transition-all hover:gap-2"
                                    style={{ color: t.primary }}
                                >
                                    View Project <ExternalLink size={14} />
                                </a>
                            )}
                        </div>

                        {/* Hover glow border */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ boxShadow: `inset 0 0 0 1.5px ${t.primary}55` }}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

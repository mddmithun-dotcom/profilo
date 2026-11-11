// portfolio/ContactSection.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';

export default function ContactSection({ data, theme: t }) {
    const { personalInfo } = data;
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Build mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: t.primary }}>✦ Get In Touch</div>
                <h2 className="text-4xl font-extrabold relative inline-block" style={{ color: t.text }}>
                    Contact Me
                    <div className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full" style={{ background: `linear-gradient(to right, ${t.primary}, ${t.accent})` }} />
                </h2>
                <p className="mt-6 max-w-lg" style={{ color: t.muted }}>
                    Have a project in mind or just want to say hi? I'd love to hear from you!
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Info side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                >
                    {personalInfo.email && (
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-1"
                            style={{ background: t.surface, border: `1px solid ${t.border}` }}
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${t.primary}22` }}>
                                <Mail size={20} style={{ color: t.primary }} />
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wider" style={{ color: t.muted }}>Email</div>
                                <div className="font-semibold" style={{ color: t.text }}>{personalInfo.email}</div>
                            </div>
                        </a>
                    )}
                </motion.div>

                {/* Form side */}
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: t.muted }}>Your Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                                placeholder="John Doe"
                                className="w-full rounded-xl px-4 py-3 text-sm font-[inherit]"
                                style={{ background: t.surface, border: `1.5px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: t.muted }}>Your Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                                placeholder="you@example.com"
                                className="w-full rounded-xl px-4 py-3 text-sm font-[inherit]"
                                style={{ background: t.surface, border: `1.5px solid ${t.border}`, color: t.text }}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: t.muted }}>Message</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.message}
                            onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                            placeholder="Tell me about your project or just say hi..."
                            className="w-full rounded-xl px-4 py-3 text-sm font-[inherit]"
                            style={{ background: t.surface, border: `1.5px solid ${t.border}`, color: t.text, resize: 'vertical' }}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white"
                        style={{
                            background: sent ? '#10B981' : `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
                            boxShadow: `0 6px 24px ${t.primary}44`,
                            transition: 'background 0.3s',
                        }}
                    >
                        {sent ? (
                            <>✓ Message opened in your email client</>
                        ) : (
                            <>
                                <Send size={16} />
                                Send Message
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}

// Step2Education.jsx - Education entries with add/remove

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap, BookOpen } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const inputClass = "form-input font-[inherit] text-sm";

const emptyEdu = { degree: '', college: '', year: '', cgpa: '' };

export default function Step2Education() {
    const education = usePortfolioStore(s => s.education);
    const addEducation = usePortfolioStore(s => s.addEducation);
    const updateEducation = usePortfolioStore(s => s.updateEducation);
    const removeEducation = usePortfolioStore(s => s.removeEducation);

    const [form, setForm] = useState(emptyEdu);

    const handleAdd = () => {
        if (!form.degree.trim() && !form.college.trim()) return;
        addEducation(form);
        setForm(emptyEdu);
    };

    const handleChange = (id, field, val) => {
        updateEducation(id, { [field]: val });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
        >
            {/* Existing education entries */}
            <AnimatePresence>
                {education.map((edu, idx) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 relative"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                                <GraduationCap size={16} />
                                Education #{idx + 1}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-400 hover:text-red-300 transition-colors hover:bg-red-500/10 p-1.5 rounded-lg"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1">Degree / Program</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="e.g. B.Tech in Computer Science"
                                    value={edu.degree}
                                    onChange={e => handleChange(edu.id, 'degree', e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-slate-400 mb-1">College / University</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="e.g. Anna University, Chennai"
                                    value={edu.college}
                                    onChange={e => handleChange(edu.id, 'college', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="e.g. 2021 – 2025"
                                    value={edu.year}
                                    onChange={e => handleChange(edu.id, 'year', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">CGPA / Percentage</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="e.g. 8.9 or 95%"
                                    value={edu.cgpa}
                                    onChange={e => handleChange(edu.id, 'cgpa', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Add new education form */}
            <div className="p-4 rounded-xl border border-dashed border-white/15 bg-white/3">
                <div className="flex items-center gap-2 text-slate-400 font-semibold text-sm mb-4">
                    <BookOpen size={16} />
                    Add Education
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Degree / Program</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. B.Tech in Computer Science"
                            value={form.degree}
                            onChange={e => setForm(f => ({ ...f, degree: e.target.value }))}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">College / University</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. Anna University, Chennai"
                            value={form.college}
                            onChange={e => setForm(f => ({ ...f, college: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. 2021 – 2025"
                            value={form.year}
                            onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">CGPA / Percentage</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. 8.9 or 95%"
                            value={form.cgpa}
                            onChange={e => setForm(f => ({ ...f, cgpa: e.target.value }))}
                        />
                    </div>
                </div>
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    className="mt-4 flex items-center gap-2 gradient-btn px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                    <Plus size={16} />
                    Add Education Entry
                </motion.button>
            </div>

            {education.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-sm">
                    <GraduationCap size={32} className="mx-auto mb-2 opacity-30" />
                    No education entries yet. Add your first one above!
                </div>
            )}
        </motion.div>
    );
}

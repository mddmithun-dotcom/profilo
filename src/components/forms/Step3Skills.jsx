// Step3Skills.jsx - Skill chip input with suggestions and auto-icons

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { getSkillData, SKILL_SUGGESTIONS } from '../../utils/skillIcons';
import usePortfolioStore from '../../store/portfolioStore';

export default function Step3Skills() {
    const skills = usePortfolioStore(s => s.skills);
    const addSkill = usePortfolioStore(s => s.addSkill);
    const removeSkill = usePortfolioStore(s => s.removeSkill);

    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = SKILL_SUGGESTIONS.filter(
        s => s.toLowerCase().includes(input.toLowerCase()) && !skills.includes(s)
    ).slice(0, 12);

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            addSkillItem(input.trim());
        }
        if (e.key === 'Escape') setShowSuggestions(false);
    };

    const addSkillItem = (name) => {
        if (!name) return;
        addSkill(name);
        setInput('');
        setShowSuggestions(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
        >
            {/* Input area */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                    <Zap size={14} className="text-violet-400" />
                    Add Skills
                </label>
                <div className="relative">
                    <input
                        type="text"
                        className="form-input font-[inherit] text-sm"
                        placeholder="Type a skill and press Enter (e.g. React, Python)"
                        value={input}
                        onChange={e => {
                            setInput(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />

                    {/* Suggestions dropdown */}
                    <AnimatePresence>
                        {showSuggestions && filteredSuggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute z-50 top-full mt-2 w-full rounded-xl border border-violet-500/20 shadow-2xl overflow-hidden"
                                style={{ background: '#1A1430' }}
                            >
                                <div className="flex flex-wrap gap-2 p-3">
                                    {filteredSuggestions.map(s => {
                                        const sd = getSkillData(s);
                                        return (
                                            <button
                                                key={s}
                                                type="button"
                                                onMouseDown={() => addSkillItem(s)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                                                style={{ background: sd.bg, color: sd.color, border: `1px solid ${sd.color}44` }}
                                            >
                                                <span>{sd.icon}</span>
                                                <span>{s}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">Press Enter or comma to add · Click a suggestion to add it</p>
            </div>

            {/* Added skills */}
            {skills.length > 0 ? (
                <div>
                    <p className="text-sm font-medium text-slate-400 mb-3">Your Skills ({skills.length})</p>
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                            {skills.map(skill => {
                                const sd = getSkillData(skill);
                                return (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        className="skill-chip group"
                                        style={{ background: sd.bg, color: sd.color, border: `1.5px solid ${sd.color}55` }}
                                    >
                                        <span>{sd.icon}</span>
                                        <span>{sd.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="ml-1 rounded-full transition-opacity opacity-60 group-hover:opacity-100"
                                            aria-label={`Remove ${skill}`}
                                        >
                                            <X size={12} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
                    <span className="text-3xl block mb-2">💡</span>
                    No skills added yet. Type above to add your first skill!
                </div>
            )}

            {/* Popular suggestions quickpick */}
            <div>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-3">Popular Skills — click to add</p>
                <div className="flex flex-wrap gap-2">
                    {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 20).map(s => {
                        const sd = getSkillData(s);
                        return (
                            <button
                                key={s}
                                type="button"
                                onClick={() => addSkillItem(s)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                                style={{
                                    background: sd.bg,
                                    color: sd.color,
                                    border: `1px solid ${sd.color}44`,
                                    opacity: 0.7,
                                }}
                            >
                                {sd.icon} {s}
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

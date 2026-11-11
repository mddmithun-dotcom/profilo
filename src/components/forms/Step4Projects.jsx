// Step4Projects.jsx - Projects with image upload, edit/delete

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, ExternalLink, Image, FolderOpen, X, Check } from 'lucide-react';
import usePortfolioStore from '../../store/portfolioStore';

const inputClass = "form-input font-[inherit] text-sm";

const emptyProject = { title: '', description: '', category: '', link: '', image: null };

export default function Step4Projects() {
    const projects = usePortfolioStore(s => s.projects);
    const addProject = usePortfolioStore(s => s.addProject);
    const updateProject = usePortfolioStore(s => s.updateProject);
    const removeProject = usePortfolioStore(s => s.removeProject);

    const [form, setForm] = useState(emptyProject);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    const handleAdd = () => {
        if (!form.title.trim()) return;
        addProject(form);
        setForm(emptyProject);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setEditForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const startEdit = (project) => {
        setEditingId(project.id);
        setEditForm({ ...project });
    };

    const saveEdit = () => {
        updateProject(editingId, editForm);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
        >
            {/* Existing projects list */}
            <AnimatePresence>
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-xl border border-violet-500/20 bg-violet-500/5 overflow-hidden"
                    >
                        {editingId === project.id ? (
                            /* Edit mode */
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-violet-400 flex items-center gap-1.5">
                                        <Edit3 size={14} /> Editing Project #{idx + 1}
                                    </span>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={saveEdit} className="text-green-400 hover:text-green-300 p-1.5 rounded-lg hover:bg-green-500/10 transition-colors">
                                            <Check size={14} />
                                        </button>
                                        <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>

                                <input className={inputClass} placeholder="Project Title" value={editForm.title || ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
                                <textarea className={inputClass} rows={3} placeholder="Description" value={editForm.description || ''} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
                                <div className="grid grid-cols-2 gap-3">
                                    <input className={inputClass} placeholder="Category / Tech" value={editForm.category || ''} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} />
                                    <input className={inputClass} placeholder="Project Link" type="url" value={editForm.link || ''} onChange={e => setEditForm(f => ({ ...f, link: e.target.value }))} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input ref={editFileInputRef} type="file" accept="image/*" onChange={handleEditImageUpload} className="hidden" />
                                    {editForm.image ? (
                                        <div className="flex items-center gap-2">
                                            <img src={editForm.image} alt="preview" className="w-12 h-12 rounded-lg object-cover" />
                                            <button type="button" onClick={() => { editFileInputRef.current?.click(); }} className="text-xs text-violet-400 hover:text-violet-300">Change Image</button>
                                            <button type="button" onClick={() => setEditForm(f => ({ ...f, image: null }))} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => editFileInputRef.current?.click()} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-400 transition-colors">
                                            <Image size={14} /> Add Project Image
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* View mode */
                            <div className="flex gap-4 p-4">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(236,72,153,0.3))' }}>
                                        📁
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-violet-400 font-medium mb-0.5">{project.category || 'Project'}</div>
                                    <div className="font-semibold text-slate-100 text-sm truncate">{project.title}</div>
                                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{project.description}</div>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-1">
                                            <ExternalLink size={10} /> View
                                        </a>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1.5 flex-shrink-0">
                                    <button type="button" onClick={() => startEdit(project)} className="text-blue-400 hover:text-blue-300 p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors">
                                        <Edit3 size={14} />
                                    </button>
                                    <button type="button" onClick={() => removeProject(project.id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Add project form */}
            <div className="p-4 rounded-xl border border-dashed border-white/15 bg-white/3 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-400 font-semibold text-sm">
                    <FolderOpen size={16} />
                    Add New Project
                </div>

                <input className={inputClass} placeholder="Project Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <textarea className={inputClass} rows={3} placeholder="Project description — what it does, how it works, what tech you used..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input className={inputClass} placeholder="Category / Technologies" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
                    <input className={inputClass} placeholder="Live URL / GitHub Link" type="url" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
                </div>

                {/* Image upload */}
                <div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    {form.image ? (
                        <div className="flex items-center gap-3">
                            <img src={form.image} alt="preview" className="w-16 h-16 rounded-xl object-cover" />
                            <div className="flex flex-col gap-1">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Change Image</button>
                                <button type="button" onClick={() => setForm(f => ({ ...f, image: null }))} className="text-xs text-red-400 hover:text-red-300 transition-colors">Remove Image</button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors border border-dashed border-white/10 rounded-xl p-3 w-full justify-center hover:border-violet-500/30">
                            <Image size={16} />
                            Add Project Screenshot (Optional)
                        </button>
                    )}
                </div>

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAdd}
                    disabled={!form.title.trim()}
                    className="gradient-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <Plus size={16} />
                    Add Project
                </motion.button>
            </div>

            {projects.length === 0 && (
                <div className="text-center py-4 text-slate-500 text-sm">
                    <FolderOpen size={28} className="mx-auto mb-2 opacity-30" />
                    No projects yet. Add your first one above!
                </div>
            )}
        </motion.div>
    );
}

// Stepper.jsx - Multi-step progress indicator

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
    { id: 1, label: 'Personal Info', short: 'Info' },
    { id: 2, label: 'Education', short: 'Edu' },
    { id: 3, label: 'Skills', short: 'Skills' },
    { id: 4, label: 'Projects', short: 'Projects' },
    { id: 5, label: 'Generate', short: 'Generate' },
];

export default function Stepper({ currentStep }) {
    return (
        <div className="w-full mb-8">
            {/* Step dots row */}
            <div className="flex items-center justify-between relative">
                {/* Connecting line behind */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 z-0" />
                <div
                    className="absolute top-5 left-0 h-0.5 z-0 transition-all duration-700"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        background: 'linear-gradient(to right, #6D28D9, #8B5CF6)',
                    }}
                />

                {steps.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isActive = step.id === currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center z-10">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: isActive ? 1.15 : 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                                    style={{
                                        background: isCompleted
                                            ? 'linear-gradient(135deg, #6D28D9, #8B5CF6)'
                                            : isActive
                                                ? 'linear-gradient(135deg, #8B5CF6, #EC4899)'
                                                : 'rgba(255,255,255,0.06)',
                                        border: isActive
                                            ? '2px solid #8B5CF6'
                                            : isCompleted
                                                ? '2px solid #6D28D9'
                                                : '2px solid rgba(255,255,255,0.15)',
                                        boxShadow: isActive
                                            ? '0 0 20px rgba(139,92,246,0.6)'
                                            : isCompleted
                                                ? '0 0 10px rgba(109,40,217,0.4)'
                                                : 'none',
                                        color: '#fff',
                                    }}
                                >
                                    {isCompleted ? (
                                        <Check size={16} strokeWidth={3} />
                                    ) : (
                                        <span>{step.id}</span>
                                    )}
                                </div>
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ background: 'rgba(139,92,246,0.3)' }}
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <span
                                className={`mt-2 text-xs font-medium hidden sm:block transition-colors duration-200`}
                                style={{ color: isActive ? '#A78BFA' : isCompleted ? '#8B5CF6' : '#64748B' }}
                            >
                                {step.label}
                            </span>
                            <span
                                className={`mt-2 text-xs font-medium sm:hidden transition-colors duration-200`}
                                style={{ color: isActive ? '#A78BFA' : isCompleted ? '#8B5CF6' : '#64748B' }}
                            >
                                {step.short}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Progress bar beneath */}
            <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, #6D28D9, #8B5CF6, #EC4899)' }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </div>
            <div className="mt-1.5 text-right text-xs text-slate-500">
                Step {currentStep} of {steps.length}
            </div>
        </div>
    );
}

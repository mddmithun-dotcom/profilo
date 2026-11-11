// portfolioStore.js - Zustand store with localStorage persistence

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Demo data for testing
export const DEMO_DATA = {
    personalInfo: {
        fullName: 'Nishanthi S',
        email: 'nishanthi.s@example.com',
        about: 'Passionate Full-Stack Developer and Data Science enthusiast with a knack for building visually stunning web applications and extracting insights from complex datasets. I love turning ideas into reality through clean code and thoughtful design.',
        role: 'Full-Stack Developer & Data Scientist',
        tagline: 'Building the future, one line of code at a time 🚀',
        location: 'Chennai, Tamil Nadu, India',
        phone: '+91 98765 43210',
        linkedin: 'https://linkedin.com/in/nishanthis',
        github: 'https://github.com/nishanthis',
        youtube: '',
        photo: null,
    },
    education: [
        {
            id: '1',
            degree: 'B.Tech in Computer Science & Engineering',
            college: 'Anna University, Chennai',
            year: '2021 – 2025',
            cgpa: '8.9',
        },
        {
            id: '2',
            degree: 'Higher Secondary (12th Grade)',
            college: 'Sri Venkateswara Matric Hr. Sec. School',
            year: '2019 – 2021',
            cgpa: '95%',
        },
    ],
    skills: [
        'Python', 'JavaScript', 'React', 'Node.js', 'Django',
        'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy',
        'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'Figma',
        'Power BI', 'Tailwind CSS',
    ],
    projects: [
        {
            id: '1',
            title: 'AI-Powered Sentiment Analyzer',
            description: 'A real-time sentiment analysis tool that processes social media posts using NLP and machine learning. Achieves 94% accuracy using fine-tuned BERT model.',
            category: 'Machine Learning / NLP',
            link: 'https://github.com/nishanthis/sentiment-analyzer',
            image: null,
        },
        {
            id: '2',
            title: 'DevConnect – Developer Social Platform',
            description: 'Full-stack social platform for developers with real-time chat, portfolio showcase, and job matching. Built with React, Node.js, and Socket.io.',
            category: 'Full-Stack Web App',
            link: 'https://github.com/nishanthis/devconnect',
            image: null,
        },
        {
            id: '3',
            title: 'Stock Market Dashboard',
            description: 'Interactive analytics dashboard for stock market data with AI-driven predictions, technical indicators, and real-time updates.',
            category: 'Data Science / Dashboard',
            link: 'https://github.com/nishanthis/stock-dashboard',
            image: null,
        },
    ],
};

const defaultState = {
    currentStep: 1,
    personalInfo: {
        fullName: '',
        email: '',
        about: '',
        role: '',
        tagline: '',
        location: '',
        phone: '',
        linkedin: '',
        github: '',
        youtube: '',
        photo: null,
    },
    education: [],
    skills: [],
    projects: [],
    template: 'purple-dark',
    theme: 'dark',
    isGenerated: false,
};

const usePortfolioStore = create(
    persist(
        (set, get) => ({
            ...defaultState,

            // Step navigation
            setStep: (step) => set({ currentStep: step }),
            nextStep: () => set(state => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
            prevStep: () => set(state => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

            // Personal Info
            updatePersonalInfo: (info) =>
                set(state => ({ personalInfo: { ...state.personalInfo, ...info } })),

            // Education
            addEducation: (edu) =>
                set(state => ({
                    education: [...state.education, { ...edu, id: Date.now().toString() }],
                })),
            updateEducation: (id, updates) =>
                set(state => ({
                    education: state.education.map(e => e.id === id ? { ...e, ...updates } : e),
                })),
            removeEducation: (id) =>
                set(state => ({ education: state.education.filter(e => e.id !== id) })),

            // Skills
            addSkill: (skill) =>
                set(state => ({
                    skills: state.skills.includes(skill) ? state.skills : [...state.skills, skill],
                })),
            removeSkill: (skill) =>
                set(state => ({ skills: state.skills.filter(s => s !== skill) })),

            // Projects
            addProject: (project) =>
                set(state => ({
                    projects: [...state.projects, { ...project, id: Date.now().toString() }],
                })),
            updateProject: (id, updates) =>
                set(state => ({
                    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
                })),
            removeProject: (id) =>
                set(state => ({ projects: state.projects.filter(p => p.id !== id) })),

            // Template & Theme
            setTemplate: (template) => set({ template }),
            toggleTheme: () =>
                set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

            // Portfolio state
            setIsGenerated: (val) => set({ isGenerated: val }),

            // Fill demo data
            fillDemoData: () => set({ ...DEMO_DATA, currentStep: 1, isGenerated: false }),

            // Reset everything
            resetAll: () => set({ ...defaultState }),
        }),
        {
            name: 'portfolio-builder-store',
        }
    )
);

export default usePortfolioStore;

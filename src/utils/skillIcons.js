// skillIcons.js - Maps skill names to colors and emoji icons

export const SKILL_DATA = {
    // Programming Languages
    'Python': { icon: '🐍', color: '#3776AB', bg: 'rgba(55, 118, 171, 0.2)' },
    'JavaScript': { icon: '⚡', color: '#F7DF1E', bg: 'rgba(247, 223, 30, 0.15)' },
    'TypeScript': { icon: '📘', color: '#3178C6', bg: 'rgba(49, 120, 198, 0.2)' },
    'Java': { icon: '☕', color: '#ED8B00', bg: 'rgba(237, 139, 0, 0.2)' },
    'C': { icon: '⚙️', color: '#A8B9CC', bg: 'rgba(168, 185, 204, 0.2)' },
    'C++': { icon: '⚙️', color: '#00599C', bg: 'rgba(0, 89, 156, 0.2)' },
    'C#': { icon: '💜', color: '#239120', bg: 'rgba(35, 145, 32, 0.2)' },
    'PHP': { icon: '🐘', color: '#777BB4', bg: 'rgba(119, 123, 180, 0.2)' },
    'Ruby': { icon: '💎', color: '#CC342D', bg: 'rgba(204, 52, 45, 0.2)' },
    'Go': { icon: '🐹', color: '#00ADD8', bg: 'rgba(0, 173, 216, 0.2)' },
    'Rust': { icon: '🦀', color: '#DEA584', bg: 'rgba(222, 165, 132, 0.2)' },
    'Swift': { icon: '🐦', color: '#FA7343', bg: 'rgba(250, 115, 67, 0.2)' },
    'Kotlin': { icon: '🎯', color: '#7F52FF', bg: 'rgba(127, 82, 255, 0.2)' },

    // Frontend
    'React': { icon: '⚛️', color: '#61DAFB', bg: 'rgba(97, 218, 251, 0.15)' },
    'Next.js': { icon: '▲', color: '#FFFFFF', bg: 'rgba(255, 255, 255, 0.1)' },
    'Vue': { icon: '💚', color: '#4FC08D', bg: 'rgba(79, 192, 141, 0.2)' },
    'Angular': { icon: '🅰️', color: '#DD0031', bg: 'rgba(221, 0, 49, 0.2)' },
    'Svelte': { icon: '🔥', color: '#FF3E00', bg: 'rgba(255, 62, 0, 0.2)' },
    'HTML': { icon: '🌐', color: '#E34F26', bg: 'rgba(227, 79, 38, 0.2)' },
    'CSS': { icon: '🎨', color: '#1572B6', bg: 'rgba(21, 114, 182, 0.2)' },
    'Tailwind CSS': { icon: '💨', color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.2)' },
    'Bootstrap': { icon: '🅱️', color: '#7952B3', bg: 'rgba(121, 82, 179, 0.2)' },
    'SASS': { icon: '💅', color: '#CC6699', bg: 'rgba(204, 102, 153, 0.2)' },

    // Backend
    'Node.js': { icon: '🟢', color: '#339933', bg: 'rgba(51, 153, 51, 0.2)' },
    'Express': { icon: '🚂', color: '#000000', bg: 'rgba(255, 255, 255, 0.1)' },
    'Django': { icon: '🎸', color: '#092E20', bg: 'rgba(9, 46, 32, 0.4)' },
    'Flask': { icon: '🌶️', color: '#000000', bg: 'rgba(255, 255, 255, 0.1)' },
    'FastAPI': { icon: '⚡', color: '#009688', bg: 'rgba(0, 150, 136, 0.2)' },
    'Spring Boot': { icon: '🌱', color: '#6DB33F', bg: 'rgba(109, 179, 63, 0.2)' },
    'Laravel': { icon: '🔴', color: '#FF2D20', bg: 'rgba(255, 45, 32, 0.2)' },

    // Databases
    'MySQL': { icon: '🗄️', color: '#00758F', bg: 'rgba(0, 117, 143, 0.2)' },
    'PostgreSQL': { icon: '🐘', color: '#336791', bg: 'rgba(51, 103, 145, 0.2)' },
    'MongoDB': { icon: '🍃', color: '#47A248', bg: 'rgba(71, 162, 72, 0.2)' },
    'SQL': { icon: '📊', color: '#336791', bg: 'rgba(51, 103, 145, 0.2)' },
    'Firebase': { icon: '🔥', color: '#FFCA28', bg: 'rgba(255, 202, 40, 0.2)' },
    'Redis': { icon: '⚡', color: '#DC382D', bg: 'rgba(220, 56, 45, 0.2)' },
    'SQLite': { icon: '📁', color: '#003B57', bg: 'rgba(0, 59, 87, 0.3)' },

    // Data Science / AI
    'Machine Learning': { icon: '🤖', color: '#FF6F00', bg: 'rgba(255, 111, 0, 0.2)' },
    'Deep Learning': { icon: '🧠', color: '#7B1FA2', bg: 'rgba(123, 31, 162, 0.2)' },
    'TensorFlow': { icon: '🔶', color: '#FF6F00', bg: 'rgba(255, 111, 0, 0.2)' },
    'PyTorch': { icon: '🔥', color: '#EE4C2C', bg: 'rgba(238, 76, 44, 0.2)' },
    'Pandas': { icon: '🐼', color: '#150458', bg: 'rgba(21, 4, 88, 0.4)' },
    'NumPy': { icon: '🔢', color: '#4DABCF', bg: 'rgba(77, 171, 207, 0.2)' },
    'Scikit-learn': { icon: '🔬', color: '#F7931E', bg: 'rgba(247, 147, 30, 0.2)' },
    'Power BI': { icon: '📊', color: '#F2C811', bg: 'rgba(242, 200, 17, 0.2)' },
    'Tableau': { icon: '📈', color: '#1F6FC1', bg: 'rgba(31, 111, 193, 0.2)' },

    // Tools & Other
    'Git': { icon: '🌿', color: '#F05032', bg: 'rgba(240, 80, 50, 0.2)' },
    'Docker': { icon: '🐳', color: '#2496ED', bg: 'rgba(36, 150, 237, 0.2)' },
    'Kubernetes': { icon: '☸️', color: '#326CE5', bg: 'rgba(50, 108, 229, 0.2)' },
    'AWS': { icon: '☁️', color: '#FF9900', bg: 'rgba(255, 153, 0, 0.2)' },
    'Azure': { icon: '☁️', color: '#0089D6', bg: 'rgba(0, 137, 214, 0.2)' },
    'GCP': { icon: '☁️', color: '#4285F4', bg: 'rgba(66, 133, 244, 0.2)' },
    'Figma': { icon: '🎨', color: '#F24E1E', bg: 'rgba(242, 78, 30, 0.2)' },
    'Adobe XD': { icon: '✏️', color: '#FF61F6', bg: 'rgba(255, 97, 246, 0.2)' },
    'Linux': { icon: '🐧', color: '#FCC624', bg: 'rgba(252, 198, 36, 0.2)' },
    'GraphQL': { icon: '🔗', color: '#E10098', bg: 'rgba(225, 0, 152, 0.2)' },
    'REST API': { icon: '🌐', color: '#00897B', bg: 'rgba(0, 137, 123, 0.2)' },
    'Redux': { icon: '🔄', color: '#764ABC', bg: 'rgba(118, 74, 188, 0.2)' },
    'Vite': { icon: '⚡', color: '#646CFF', bg: 'rgba(100, 108, 255, 0.2)' },
};

export const SKILL_SUGGESTIONS = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express',
    'Django', 'Flask', 'FastAPI', 'HTML', 'CSS', 'Tailwind CSS',
    'MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'Firebase', 'Redis',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Figma', 'Adobe XD',
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'GraphQL',
    'REST API', 'Redux', 'Bootstrap', 'SASS', 'Spring Boot', 'Laravel',
];

/**
 * Get skill display data — falls back to a generic style for unknown skills
 */
export function getSkillData(skill) {
    const normalized = Object.keys(SKILL_DATA).find(
        k => k.toLowerCase() === skill.toLowerCase()
    );
    if (normalized) return { ...SKILL_DATA[normalized], name: normalized };
    return {
        icon: '💡',
        color: '#8B5CF6',
        bg: 'rgba(139, 92, 246, 0.2)',
        name: skill,
    };
}

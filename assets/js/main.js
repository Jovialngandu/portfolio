let skillsChart;

function getThemePalette() {
    const isDark = document.documentElement.classList.contains('dark');

    return {
        isDark,
        textColor: isDark ? '#e2e8f0' : '#334155',
        mutedColor: isDark ? '#cbd5e1' : '#475569',
        gridColor: isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(148, 163, 184, 0.28)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        tooltipBg: isDark ? '#0f172a' : '#ffffff',
        tooltipText: isDark ? '#e2e8f0' : '#0f172a',
        accent: '#14b8a6'
    };
}

function renderSkillsChart() {
    const palette = getThemePalette();
    const canvas = document.getElementById('skillsChart');

    if (!canvas) return;

    const skillsData = {
        labels: [
            'Python', 'FastAPI', 'Django',
            'PHP', 'Laravel',
            'JavaScript', 'TypeScript', 'React', 'React Native', 'Electron.js',
            'SQL & Databases',
            'Git / GitHub', 'Linux & Docker',
            'Machine Learning & OpenCV',
            'Gestion de Projet & Agile'
        ],
        datasets: [{
            label: 'Niveau de maîtrise',
            data: [85, 80, 75, 78, 75, 75, 60, 65, 60, 55, 70, 75, 65, 60, 75],
            backgroundColor: palette.accent,
            borderColor: palette.borderColor,
            borderWidth: 1,
            borderRadius: 8
        }]
    };

    const skillCategories = {
        'Backend': ['Python', 'FastAPI', 'Django', 'PHP', 'Laravel'],
        'Frontend & Mobile': ['JavaScript', 'TypeScript', 'React', 'React Native', 'Electron.js'],
        'Bases de Données': ['SQL & Databases'],
        'DevOps & Outils': ['Git / GitHub', 'Linux & Docker'],
        'Machine Learning & IA': ['Machine Learning & OpenCV'],
        'Management': ['Gestion de Projet & Agile']
    };

    if (skillsChart) {
        skillsChart.destroy();
    }

    skillsChart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: skillsData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: palette.tooltipBg,
                    titleColor: palette.tooltipText,
                    bodyColor: palette.tooltipText,
                    callbacks: {
                        title: function (context) {
                            const label = context[0].label;
                            for (const category in skillCategories) {
                                if (skillCategories[category].includes(label)) {
                                    return category;
                                }
                            }
                            return '';
                        },
                        label: function (context) {
                            return ` Maîtrise : ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    beginAtZero: true,
                    max: 100,
                    grid: { color: palette.gridColor }
                },
                y: {
                    ticks: {
                        font: { size: 13, weight: '500' },
                        color: palette.textColor
                    },
                    grid: { color: palette.gridColor }
                }
            },
            barThickness: 16
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderSkillsChart();

    document.addEventListener('theme:changed', renderSkillsChart);

    const sections = document.querySelectorAll('.section-fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
});
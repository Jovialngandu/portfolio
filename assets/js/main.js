        document.addEventListener('DOMContentLoaded', function () {
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
                    backgroundColor: '#0d9488',
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    borderRadius: 6
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

            const ctx = document.getElementById('skillsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: skillsData,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
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
                        x: { display: false, beginAtZero: true, max: 100 },
                        y: { ticks: { font: { size: 13, weight: '500' }, color: '#334155' } }
                    },
                    barThickness: 16
                }
            });

            // Animation d’apparition
            const sections = document.querySelectorAll('.section-fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            sections.forEach(section => observer.observe(section));
        });
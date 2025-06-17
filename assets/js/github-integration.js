// GitHub repositories integration
$(document).ready(function() {
    const username = 'LucasKonrath';
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const featuredRepos = [
        'gof-design-patterns-java',
        'KMapper',
        'spring-boot-kotlin',
        'KSP-KMapper',
        'Java-ThreadPool-POC',
        'KMapper-Perfomance-Tests'
    ];

    function fetchGitHubRepos() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(repos) {
                const featuredRepositories = repos.filter(repo => 
                    featuredRepos.includes(repo.name)
                ).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                if (featuredRepositories.length > 0) {
                    updateProjectsWithGitHubData(featuredRepositories);
                }
            },
            error: function(xhr, status, error) {
                console.log('GitHub API request failed:', error);
                // Fallback to static data if API fails
            }
        });
    }

    function updateProjectsWithGitHubData(repos) {
        $('.project-item').each(function() {
            const projectTitle = $(this).find('.project-title a').text().trim();
            const repo = repos.find(r => r.name === projectTitle.replace('GOF Design Patterns in Java', 'gof-design-patterns-java'));
            
            if (repo) {
                // Add GitHub stats
                const stats = `
                    <div class="github-stats">
                        <span class="stat">
                            <i class="fas fa-star"></i> ${repo.stargazers_count}
                        </span>
                        <span class="stat">
                            <i class="fas fa-code-branch"></i> ${repo.forks_count}
                        </span>
                        <span class="stat">
                            <i class="fas fa-circle ${repo.language ? repo.language.toLowerCase() : 'generic'}"></i> 
                            ${repo.language || 'Mixed'}
                        </span>
                        <span class="stat">
                            <i class="fas fa-clock"></i> 
                            ${new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                    </div>
                `;
                
                $(this).find('.project-tagline').after(stats);
            }
        });
    }

    // Add language color indicators
    const languageColors = {
        'java': '#b07219',
        'kotlin': '#F18E33',
        'javascript': '#f1e05a',
        'typescript': '#2b7489',
        'python': '#3572A5',
        'shell': '#89e051',
        'html': '#e34c26',
        'css': '#563d7c',
        'generic': '#586069'
    };

    function addLanguageColors() {
        $('.github-stats .stat .fas.fa-circle').each(function() {
            const language = $(this).parent().text().trim().toLowerCase();
            const color = languageColors[language] || languageColors['generic'];
            $(this).css('color', color);
        });
    }

    // Only fetch if we're not in development mode and the projects section exists
    if ($('.projects-section').length > 0 && window.location.hostname !== 'localhost') {
        fetchGitHubRepos();
        setTimeout(addLanguageColors, 1000);
    }
});

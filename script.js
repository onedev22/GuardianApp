document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Obtener conteo de descargas desde GitHub API
    fetchDownloadCount();
});

async function fetchDownloadCount() {
    const repo = 'onedev22/GuardianApp';
    const apiUrl = `https://api.github.com/repos/${repo}/releases`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API error');

        const releases = await response.json();
        let totalDownloads = 0;

        // Sumar todas las descargas de todos los releases
        releases.forEach(release => {
            release.assets.forEach(asset => {
                totalDownloads += asset.download_count;
            });
        });

        // Actualizar los contadores en la página
        updateDownloadCounters(totalDownloads);
    } catch (error) {
        console.error('Error fetching download count:', error);
        // Mostrar "N/A" si hay error
        updateDownloadCounters(null);
    }
}

function updateDownloadCounters(count) {
    const heroCounter = document.getElementById('download-count');
    const sectionCounter = document.getElementById('download-count-section');

    const displayValue = count !== null ? formatNumber(count) : 'N/A';

    if (heroCounter) {
        heroCounter.textContent = displayValue;
        if (count !== null) {
            animateCounter(heroCounter, count);
        }
    }

    if (sectionCounter) {
        sectionCounter.textContent = displayValue;
        if (count !== null) {
            animateCounter(sectionCounter, count);
        }
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('es-ES');
}

function animateCounter(element, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function para animación suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = formatNumber(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

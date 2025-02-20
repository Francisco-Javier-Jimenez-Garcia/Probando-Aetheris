// Navegación suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Efecto de fade-in al hacer scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Mostrar últimos 3 videos de YouTube
const apiKey = 'AIzaSyBPoRmvGN2uVPlKArA8K9sIeZ4aBWdOm14'; // Reemplaza con tu clave API
const channelId = 'UCiZTBBwwElTiWHrwk1swfag'; // Reemplaza con el ID de tu canal
const videoContainer = document.getElementById('youtube-videos');

async function fetchVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`
        );
        const data = await response.json();
        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            videoContainer.appendChild(iframe);
        });
    } catch (error) {
        console.error('Error al cargar videos:', error);
        videoContainer.innerHTML = '<p>No se pudieron cargar los videos.</p>';
    }
}

fetchVideos();




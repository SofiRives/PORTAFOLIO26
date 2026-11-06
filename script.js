// Animación al hacer scroll---------------------------------------

const fadeElements = document.querySelectorAll('.reveal');

if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
}


// Zoom en imágenes-----------------------------------------------

const projectImages = document.querySelectorAll('.proj-img');

if (projectImages.length > 0) {
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.03)';
            img.style.boxShadow = '0 0 35px rgba(232, 56, 13, 0.55)';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = 'none';
        });
    });
}



// filtro para las etiquetas------------------------

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.proj-detail-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.dataset.filter;

            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;

                if (selectedCategory === 'todos' || cardCategory === selectedCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

(function () {
    var cards = document.querySelectorAll('.flip-card');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach(function (card) {
        function flip() {
            var on = card.classList.toggle('flip');
            card.setAttribute('aria-pressed', on);
            card.style.transform = '';
        }

        card.addEventListener('click', flip);

        card.addEventListener('keydown', function (e) {
            if (e.target !== card) return;           // no interferir con el enlace de atrás
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flip();
            }
        });

        // El enlace "Ver proyecto" navega sin voltear la tarjeta
        card.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function (e) { e.stopPropagation(); });
        });

        if (reduce) return;

        // Inclinación siguiendo el cursor (solo con mouse)
        card.addEventListener('mousemove', function (e) {
            if (card.classList.contains('flip')) return;
            var r = card.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - 0.5;
            var y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transition = 'transform .1s';
            card.style.transform = 'rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 14) + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transition = '';
            card.style.transform = '';
        });
    });
})();

// --- ANIMACIÓN HERO (Sin sombra dinámica) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Separar el texto en spans por cada letra
    document.querySelectorAll('#home .hero-name[data-split]').forEach(el => {
        const lines = el.dataset.split.split('|');
        el.setAttribute('aria-label', lines.join(' '));
        el.innerHTML = lines.map((line, lineIndex) =>
            `<span class="ln" aria-hidden="true" style="--o:${lineIndex * 5}">${[...line].map((char, charIndex) => `<span class="lt" style="--i:${charIndex}">${char}</span>`).join('')
            }</span>`
        ).join('');
    });

    // 2. Observer para disparar la animación de entrada (.in)
    const heroElement = document.querySelector('#home .hero');
    if (heroElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroElement.classList.add('in');
                }
            });
        }, { threshold: 0.2 });

        observer.observe(heroElement);
    }
});


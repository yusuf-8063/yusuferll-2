let currentPoemIndex = 0;
const poems = document.querySelectorAll('.poem-container');
const dotsContainer = document.getElementById('dotsContainer');
const poemSlider = document.getElementById('poemSlider');
let slideInterval;
let touchStartX = 0;
let touchEndX = 0;

// Şiir konteynerlerini boyutlandırma fonksiyonu
function resizePoemContainers() {
    poems.forEach(container => {
        const poemText = container.querySelector('.poem-text');
        // Padding ve border dahil toplam yüksekliği hesapla
        const totalHeight = poemText.scrollHeight + 60; // 60 = padding (30x2)
        container.style.minHeight = `${totalHeight}px`;
    });
    
    // Slider'ın yüksekliğini en uzun şiire göre ayarla
    const maxHeight = Math.max(...Array.from(poems).map(p => p.scrollHeight));
    poemSlider.style.minHeight = `${maxHeight + 60}px`;
}

// Create dots
poems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToPoem(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showPoem(index) {
    poems.forEach((poem, i) => {
        poem.classList.remove('active', 'prev', 'next');
        if (i === index) {
            poem.classList.add('active');
        } else if (i < index) {
            poem.classList.add('prev');
        } else {
            poem.classList.add('next');
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToPoem(index) {
    currentPoemIndex = index;
    showPoem(currentPoemIndex);
    resetInterval();
}

function changePoem(direction) {
    currentPoemIndex += direction;
    
    if (currentPoemIndex >= poems.length) {
        currentPoemIndex = 0;
    } else if (currentPoemIndex < 0) {
        currentPoemIndex = poems.length - 1;
    }
    
    showPoem(currentPoemIndex);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changePoem(1);
    }, 10000);
}

// Touch events for swipe
poemSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

poemSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) {
        changePoem(1);
    } else if (difference < -50) {
        changePoem(-1);
    }
}

// Mouse events for desktop swipe
let mouseDownX = 0;
let mouseUpX = 0;

poemSlider.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX;
});

poemSlider.addEventListener('mouseup', (e) => {
    mouseUpX = e.clientX;
    const difference = mouseDownX - mouseUpX;
    if (difference > 50) {
        changePoem(1);
    } else if (difference < -50) {
        changePoem(-1);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPoem(0);
    resizePoemContainers(); // İlk yüklemede boyutlandır
    slideInterval = setInterval(() => {
        changePoem(1);
    }, 10000);
});

// Pencere boyutu değiştiğinde yeniden boyutlandır
window.addEventListener('resize', resizePoemContainers);



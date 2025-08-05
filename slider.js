document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;
    
    function goToSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Aktif slide'ı güncelle
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Buton event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Otomatik geçişi başlat
    slideInterval = setInterval(nextSlide, 5000);
});



document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Noktaları oluştur
    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Aktif slide ve dot'ı güncelle
        updateActive();
    }
    
    function updateActive() {
        // Slide'ları güncelle
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        // Noktaları güncelle
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Buton event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // İlk çalıştırmada noktaları oluştur
    createDots();
    
    // Otomatik geçişi başlat
    slideInterval = setInterval(nextSlide, 5000);
});

// Slider.js için mobil dokunmatik destek
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            nextSlide();
        } else if (difference < -50) {
            prevSlide();
        }
    }
});

// Şiir slider.js için mobil dokunmatik destek
poemSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

poemSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});
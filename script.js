document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('animated-background');
    const colors = [
        'rgba(255, 159, 243, 0.7)',
        'rgba(254, 202, 87, 0.7)',
        'rgba(255, 107, 107, 0.7)',
        'rgba(72, 219, 251, 0.7)',
        'rgba(29, 209, 161, 0.7)',
        'rgba(243, 104, 224, 0.7)'
    ];
    const bubbleCount = 12;
    const bubbles = [];
    const minDistance = 120;

    // Yuvarlak oluşturma
    function createBubble() {
        const bubble = document.createElement('div');
        const size = Math.floor(Math.random() * 100 + 60);
        let posX, posY, isValidPosition;
        let attempts = 0;
        const maxAttempts = 100;

        do {
            isValidPosition = true;
            posX = Math.random() * (window.innerWidth - size);
            posY = Math.random() * (window.innerHeight - size);
            attempts++;

            for (const other of bubbles) {
                const dx = posX - other.x;
                const dy = posY - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = minDistance + (size/2 + other.size/2);

                if (distance < minDist) {
                    isValidPosition = false;
                    break;
                }
            }

            if (attempts >= maxAttempts) {
                isValidPosition = true; // Son çare
                console.warn('Maksimum deneme sayısına ulaşıldı');
            }
        } while (!isValidPosition && bubbles.length > 0);

        bubble.className = 'bubble';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}px`;
        bubble.style.top = `${posY}px`;
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        bg.appendChild(bubble);
        bubbles.push({
            x: posX,
            y: posY,
            size: size,
            element: bubble,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8
        });
    }

    // Başlangıçta yuvarlakları oluştur
    for (let i = 0; i < bubbleCount; i++) {
        createBubble();
    }

    // Animasyon
    function animate() {
        bubbles.forEach(bubble => {
            // Yeni pozisyon
            let newX = bubble.x + bubble.vx;
            let newY = bubble.y + bubble.vy;

            // Sınır kontrolü
            if (newX < 0 || newX > window.innerWidth - bubble.size) {
                bubble.vx *= -1;
                newX = bubble.x;
            }
            if (newY < 0 || newY > window.innerHeight - bubble.size) {
                bubble.vy *= -1;
                newY = bubble.y;
            }

            // Çarpışma kontrolü
            let canMove = true;
            bubbles.forEach(other => {
                if (bubble === other) return;

                const dx = newX - other.x;
                const dy = newY - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDist = minDistance + (bubble.size/2 + other.size/2);

                if (distance < minDist) {
                    canMove = false;
                    
                    // İtme efekti
                    const angle = Math.atan2(dy, dx);
                    const force = 0.3;
                    bubble.vx = Math.cos(angle) * force;
                    bubble.vy = Math.sin(angle) * force;
                }
            });

            if (canMove) {
                bubble.x = newX;
                bubble.y = newY;
                bubble.element.style.left = `${newX}px`;
                bubble.element.style.top = `${newY}px`;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Pencere boyutu değiştiğinde yenile
    window.addEventListener('resize', () => {
        bubbles.forEach(bubble => {
            bubble.x = Math.min(bubble.x, window.innerWidth - bubble.size);
            bubble.y = Math.min(bubble.y, window.innerHeight - bubble.size);
            bubble.element.style.left = `${bubble.x}px`;
            bubble.element.style.top = `${bubble.y}px`;
        });
    });
});

// Kalp animasyonu bittiğinde butonu göster
setTimeout(() => {
    document.querySelector('.action-btn-container').style.display = 'block';
}, 5000); // 5 saniyede göster




// Bubble boyutlarını mobil için optimize et
function createBubble() {
    const bubble = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    const size = isMobile ? Math.floor(Math.random() * 60 + 30) : Math.floor(Math.random() * 100 + 60);
    // ... (kalan kod aynı)
}




//müzik çalar
document.addEventListener('DOMContentLoaded', function() {
    const player = {
        songs: [
            { title: "Its a Lovely Day",     file: "music/Erica Jennings - Its a Lovely Day.mp3" },
            { title: "Seviyorsan İnanıyorsan",     file: "music/Seviyorsan İnanıyorsan.mp3" },
            { title: "Aşkın Sarhoşluğu",     file: "music/Aşkın bu sarhoşluğu.mp3" },
            { title: "Bana Ellerini Ver",    file: "music/Bana Ellerini Ver - Özdemir Erdoğan.mp3" },
            { title: "Sıcak Şarap",          file: "music/Batuhan Kordel - Sıcak Şarap.mp3" },
            { title: "Bi Tek Ben Anlarım",   file: "music/Bi Tek Ben Anlarım.mp3" },
            { title: "Çayır Çimen Geze Geze",file: "music/Kıraç - Çayır Çimen Geze Geze (Official Audio).mp3" },
            { title: "En Güzel Günüm Gecem", file: "music/Duman - En Güzel Günüm Gecem.mp3" },
            { title: "Senden Güzeli Mi Var", file: "music/Emre Fel - Senden Güzeli Mi Var (Lyrics Video).mp3" },
            { title: "Gözleri Aşka Gülen )", file: "music/Gözde Öney - Gözleri Aşka Gülen (İki Teklik Şarkılar) (Official Video).mp3" },
            { title: "Papatya",              file: "music/HiraiZerdüş - Papatya.mp3" },
            { title: "Tencere Kapak",        file: "music/Kenan Doğulu - Tencere Kapak.mp3" },  
            { title: "Endamın Yeter",        file: "music/Kıraç - Endamın Yeter (Official Video).mp3" },
            { title: "A Canım",              file: "music/Mabel Matiz - A Canım.mp3" },
            { title: "Aklımı Kaçırdım ",     file: "music/Mavi Gri - Aklımı Kaçırdım (Official Video).mp3" },
            { title: "Merhabalar",           file: "music/Merhabalar.mp3" },
            { title: "Güzel Kızım",          file: "music/Misafir - Güzel Kızım.mp3" },
            { title: "Hele Bi Gel",          file: "music/Pinhâni - Hele Bi Gel.mp3" },
            { title: "Seni Kendime Sakladım",              file: "music/Seni Kendime Sakladım - Duman.mp3" },
            { title: "Tutun Sen Bana",           file: "music/Yüzyüzeyken Konuşuruz - Tutun Sen Bana.mp3" },
        ],
        currentIndex: 0,
        audio: new Audio(),
        isPlaying: false,
        btn: document.getElementById('play-pause-btn'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        title: document.getElementById('song-title'),
        
        init: function() {
            this.btn.addEventListener('click', () => this.togglePlay());
            this.prevBtn.addEventListener('click', () => this.prevSong());
            this.nextBtn.addEventListener('click', () => this.nextSong());
            
            this.audio.addEventListener('canplay', () => {
                this.title.textContent = "Çalmaya Hazır: " + this.currentSong();
            });
            
            this.audio.addEventListener('play', () => {
                this.title.textContent = "Şimdi Çalıyor: " + this.currentSong();
            });
            
            this.audio.addEventListener('error', () => {
                this.title.textContent = "Müzik yüklenemedi: " + this.currentSong();
                console.error("Müzik dosyası bulunamadı: " + this.audio.src);
            });
            
            this.loadSong(this.songs[this.currentIndex]);
        },
        
        currentSong: function() {
            return this.songs[this.currentIndex].title;
        },
        
        loadSong: function(song) {
            this.audio.src = song.file;
            this.audio.load();
            if (this.isPlaying) {
                this.audio.play().catch(e => console.error("Çalma hatası:", e));
            }
        },
        
        togglePlay: function() {
            if (this.isPlaying) {
                this.audio.pause();
                this.btn.textContent = '▶';
                this.title.textContent = "Duraklatıldı: " + this.currentSong();
            } else {
                this.audio.play()
                    .then(() => {
                        this.btn.textContent = '❚❚';
                        this.title.textContent = "Şimdi Çalıyor: " + this.currentSong();
                    })
                    .catch(error => {
                        console.error("Çalma hatası:", error);
                        this.title.textContent = "Çalma başarısız";
                    });
            }
            this.isPlaying = !this.isPlaying;
        },
        
        prevSong: function() {
            this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
            this.loadSong(this.songs[this.currentIndex]);
            this.title.textContent = "Yükleniyor: " + this.currentSong();
        },
        
        nextSong: function() {
            this.currentIndex = (this.currentIndex + 1) % this.songs.length;
            this.loadSong(this.songs[this.currentIndex]);
            this.title.textContent = "Yükleniyor: " + this.currentSong();
        }
    };
    
    player.init();
});



document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    menuToggle.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden');
    });

    const menuLinks = dropdownMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdownMenu.classList.add('hidden');
        });
    });

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isCarouselPaused = false;

    const carousel = document.getElementById('carousel');

    carousel.addEventListener('mouseenter', function() {
        isCarouselPaused = true;
        clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', function() {
        isCarouselPaused = false;
        startAutoPlay();
    });

    function showSlide(n) {
        if (n >= totalSlides) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = n;
        }

        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? '1' : '0';
            slide.style.pointerEvents = index === currentSlide ? 'auto' : 'none';
        });

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-white');
            } else {
                dot.classList.remove('bg-white');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    document.getElementById('prevSlide').addEventListener('click', function() {
        clearInterval(autoPlayInterval);
        showSlide(currentSlide - 1);
        if (!isCarouselPaused) {
            startAutoPlay();
        }
    });

    document.getElementById('nextSlide').addEventListener('click', function() {
        clearInterval(autoPlayInterval);
        showSlide(currentSlide + 1);
        if (!isCarouselPaused) {
            startAutoPlay();
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(autoPlayInterval);
            showSlide(parseInt(this.dataset.index));
            if (!isCarouselPaused) {
                startAutoPlay();
            }
        });
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 3000);
    }

    startAutoPlay();
    showSlide(0);

    const playButtons = document.querySelectorAll('.btn-play');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = '\u25a0';
            this.style.color = '#ef4444';
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.color = '';
            }, 800);
        });
    });

    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '\u2665';
                this.style.color = '#ef4444';
            } else {
                this.innerHTML = '\u2661';
                this.style.color = '';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const dotsContainer = document.querySelector('.gallery-dots');
    const prevBtn = document.querySelector('.nav-button.prev');
    const nextBtn = document.querySelector('.nav-button.next');
    
    
    let currentIndex = 0;
    let autoSlideInterval;
    const visibleItems = 3; 

    
    if (!track || !items.length || !dotsContainer || !prevBtn || !nextBtn) {
        console.error('Required elements not found');
        return;
    }

    
    function createDots() {
        dotsContainer.innerHTML = ''; 
        const dotCount = Math.ceil(items.length / visibleItems);
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i * visibleItems));
            dotsContainer.appendChild(dot);
        }
    }

    
    function updateSlider() {
        if (!items.length) return;
        
        const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(track).gap);
        const maxOffset = (items.length - visibleItems) * itemWidth;
        let offset = currentIndex * itemWidth;
        
       
        offset = Math.min(offset, maxOffset);
        offset = Math.max(offset, 0);
        
        track.style.transform = `translateX(-${offset}px)`;
        
        
        const dots = document.querySelectorAll('.gallery-dot');
        const activeDotIndex = Math.floor(currentIndex / visibleItems);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, items.length - visibleItems));
        updateSlider();
        resetAutoSlide();
    }

  
    function moveSlide(step) {
        let newIndex = currentIndex + step;
        
        
        if (newIndex < 0) {
            newIndex = items.length - visibleItems;
        } else if (newIndex > items.length - visibleItems) {
            newIndex = 0;
        }
        
        currentIndex = newIndex;
        updateSlider();
        resetAutoSlide();
    }

    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            moveSlide(1); 
        }, 3000);
    }

    
    function initGallery() {
        createDots();
        updateSlider();
        resetAutoSlide();
        
        
        prevBtn.addEventListener('click', () => moveSlide(-1));
        nextBtn.addEventListener('click', () => moveSlide(1));

       
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', resetAutoSlide);

        
        const resizeObserver = new ResizeObserver(() => {
            updateSlider();
        });
        resizeObserver.observe(track);
    }

    
    initGallery();
});


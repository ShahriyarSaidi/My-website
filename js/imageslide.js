document.querySelectorAll('.image-slider-wrapper').forEach(wrapper => {
    const slider = wrapper.querySelector('.image-slider');
    const images = Array.from(slider.querySelectorAll('img'));
    const dotsContainer = wrapper.querySelector('.slider-dots');

    // Clone first and last for smooth loop
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, images[0]);

    const total = images.length;

    // 👉 Hər dəfə girişdə 1-ci şəkildən başla
    let current = 1;

    // İlk mövqeyi göstər
    slider.style.transition = 'none';
    slider.style.transform = `translateX(-${current * 100}%)`;
    setTimeout(() => {
        slider.style.transition = 'transform 0.5s ease';
    }, 50);

    // Dots yarad
    images.forEach((_, idx) => {
        const dot = document.createElement('span');
        if (idx === current - 1) dot.classList.add('active');
        dot.addEventListener('click', () => {
            current = idx + 1;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function updateSlider(transition = true) {
        if (!transition) slider.style.transition = 'none';
        else slider.style.transition = 'transform 0.5s ease';

        slider.style.transform = `translateX(-${current * 100}%)`;

        dots.forEach(d => d.classList.remove('active'));
        let dotIndex = current - 1;
        if (dotIndex < 0) dotIndex = total - 1;
        if (dotIndex >= total) dotIndex = 0;
        dots[dotIndex].classList.add('active');
    }

    // Transition end fix
    slider.addEventListener('transitionend', () => {
        if (current === 0) {
            current = total;
            updateSlider(false);
            setTimeout(() => slider.style.transition = 'transform 0.5s ease', 50);
        } else if (current > total) {
            current = 1;
            updateSlider(false);
            setTimeout(() => slider.style.transition = 'transform 0.5s ease', 50);
        }
    });

    // Arrows
    wrapper.querySelector('.next')?.addEventListener('click', () => {
        current++;
        updateSlider();
    });
    wrapper.querySelector('.prev')?.addEventListener('click', () => {
        current--;
        updateSlider();
    });

    // 👉 Drag / Swipe ilə canlı sürükləmə
    let startX = 0;
    let isDragging = false;
    let movedX = 0;

    const dragStart = (x) => {
        isDragging = true;
        startX = x;
        movedX = 0;
        slider.style.transition = "none";
    };

    const dragMove = (x) => {
        if (!isDragging) return;
        movedX = x - startX;
        const offset = -current * 100 + (movedX / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        const threshold = slider.offsetWidth * 0.2;
        if (movedX > threshold) {
            current--;
        } else if (movedX < -threshold) {
            current++;
        }
        updateSlider(true);
    };

    // Mouse events
    slider.addEventListener("mousedown", e => dragStart(e.pageX));
    slider.addEventListener("mousemove", e => dragMove(e.pageX));
    slider.addEventListener("mouseup", dragEnd);
    slider.addEventListener("mouseleave", dragEnd);

    // Touch events
    slider.addEventListener("touchstart", e => dragStart(e.touches[0].clientX));
    slider.addEventListener("touchmove", e => dragMove(e.touches[0].clientX));
    slider.addEventListener("touchend", dragEnd);
});


    document.addEventListener("DOMContentLoaded", function () {
      const playBtn = document.querySelector('.mobile-menu-icon');
      const burgerIcon = playBtn.querySelector('.burger');

      const audio = new Audio('music/lofi-chill-3-315216.mp3');

      audio.loop = true;

      let isPlaying = false;

      playBtn.addEventListener('click', function (e) {
        e.preventDefault();

        if (!isPlaying) {
          audio.play();
          audio.volume = 0.5; // səs səviyyəsi 50%
          isPlaying = true;

          // Pause icon göstər
          burgerIcon.innerHTML = '<path d="M10 8H12V16H10V8ZM14 8H16V16H14V8Z"></path>';
        } else {
          audio.pause();
          isPlaying = false;

          // Play icon göstər
          burgerIcon.innerHTML = '<path d="M10 8L16 12L10 16V8Z"></path>';
        }
      });
    });


    // document.addEventListener("DOMContentLoaded", function () {
    //   const playBtn = document.querySelector('.mobile-menu-icon');
    //   const burgerIcon = playBtn.querySelector('.burger');

    //   const audio = new Audio('music/We-Wish-You-chosic.com_.mp3');

    //   audio.loop = true;

    //   let isPlaying = false;

    //   playBtn.addEventListener('click', function (e) {
    //     e.preventDefault();

    //     if (!isPlaying) {
    //       audio.play();
    //       audio.volume = 0.5; // səs səviyyəsi 50%
    //       isPlaying = true;

    //       // Pause icon göstər
    //       burgerIcon.innerHTML = '<path d="M10 8H12V16H10V8ZM14 8H16V16H14V8Z"></path>';
    //     } else {
    //       audio.pause();
    //       isPlaying = false;

    //       // Play icon göstər
    //       burgerIcon.innerHTML = '<path d="M10 8L16 12L10 16V8Z"></path>';
    //     }
    //   });
    // });




    document.addEventListener("DOMContentLoaded", function () {
  const audio = new Audio('music/We-Wish-You-chosic.com_.mp3');
  audio.loop = true;
  audio.volume = 0.5;

  const playBtn = document.querySelector('.mobile-menu-icon');
  const burgerIcon = playBtn.querySelector('.burger');

  let isPlaying = false;

  // AudioContext yarat və autoplay üçün unlock
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const track = audioCtx.createMediaElementSource(audio);
  track.connect(audioCtx.destination);

  const startAudio = () => {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    audio.play().then(() => {
      isPlaying = true;
      burgerIcon.innerHTML = '<path d="M10 8H12V16H10V8ZM14 8H16V16H14V8Z"></path>'; // Pause icon
    }).catch(() => {
      console.log("Autoplay browser tərəfindən bloklandı, klikləmək lazım ola bilər.");
    });
  };

  // Sayfa açılan kimi çalışdır
  startAudio();

  // Play/pause düyməsi
  playBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (!isPlaying) {
      startAudio();
    } else {
      audio.pause();
      isPlaying = false;
      burgerIcon.innerHTML = '<path d="M10 8L16 12L10 16V8Z"></path>'; // Play icon
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const e = new Audio("music/We-Wish-You-chosic.com_.mp3");
  e.loop = true;
  e.volume = 0.5;

  const n = document.querySelector(".mobile-menu-icon"),
    t = n.querySelector(".burger");

  let o = false;

  const c = new (window.AudioContext || window.webkitAudioContext)();
  c.createMediaElementSource(e).connect(c.destination);

  const playMusic = () => {
    if (c.state === "suspended") c.resume();
    e.play().then(() => {
      o = true;
      t.innerHTML =
        '<path d="M10 8H12V16H10V8ZM14 8H16V16H14V8Z"></path>';
    });
  };

  // ❌ autoplay LƏĞV EDİLDİ
  // playMusic();

  n.addEventListener("click", function (n) {
    n.preventDefault();
    if (o) {
      e.pause();
      o = false;
      t.innerHTML = '<path d="M10 8L16 12L10 16V8Z"></path>';
    } else {
      playMusic();
    }
  });
});

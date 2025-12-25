// const canvas = document.getElementById("snow");
// const ctx = canvas.getContext("2d");

// // Canvas ölçüləri
// let width = canvas.width = window.innerWidth;
// let height = canvas.height = window.innerHeight;

// // Qar layer-ləri
// let layers = [];
// let bokehLights = [];

// // Layer yaratmaq funksiyası
// function createLayer(count, maxR, minD, maxD, maxO, maxBlur) {
//   let snowflakes = [];
//   for (let i = 0; i < count; i++) {
//     snowflakes.push({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       r: Math.random() * maxR + 0.5,
//       d: Math.random() * (maxD - minD) + minD,
//       o: Math.random() * maxO + 0.2,
//       blur: Math.random() * maxBlur + 0.5,
//       angle: Math.random() * Math.PI
//     });
//   }
//   return snowflakes;
// }

// // Bokeh işıqları yaratmaq
// function createBokeh(count) {
//   bokehLights = [];
//   for (let i = 0; i < count; i++) {
//     bokehLights.push({
//       x: Math.random() * width,
//       y: Math.random() * height,
//       r: Math.random() * 50 + 20,        // radius daha böyük və random
//       a: Math.random() * 0.25 + 0.05,    // opacity
//       speedX: (Math.random() - 0.5) * 0.1, // yüngül hərəkət X
//       speedY: (Math.random() - 0.5) * 0.1, // yüngül hərəkət Y
//       grow: Math.random() * 0.05 + 0.01,   // radius dəyişimi
//       maxR: Math.random() * 40 + 30,
//       minR: Math.random() * 10 + 10,
//       growing: true
//     });
//   }
// }

// // Gecə rejimi yoxlama
// function isNight() {
//   const hour = new Date().getHours();
//   return hour >= 18 || hour < 7;
// }

// // Layer-ləri yarat
// function createSnowflakes() {
//   layers = [];
//   layers.push(createLayer(50, 1.5, 0.2, 0.3, 0.9, 3)); // Ön plan
//   layers.push(createLayer(40, 1, 0.1, 0.25, 0.6, 2)); // Orta plan
//   layers.push(createLayer(30, 0.5, 0.05, 0.15, 0.4, 1)); // Arxa plan
//   createBokeh(25); // Bokeh işıqları
// }

// // Bir qar dənəsi çəkmək
// function drawSnowflake(f, night) {
//   ctx.save();
//   ctx.beginPath();
//   let opacity = night ? Math.min(f.o + 0.2, 1) : f.o;
//   let blur = night ? Math.min(f.blur + 1, 5) : f.blur;
//   ctx.fillStyle = `rgba(255,255,255,${opacity})`;
//   ctx.shadowColor = "white";
//   ctx.shadowBlur = blur;
//   ctx.translate(f.x, f.y);
//   ctx.rotate(f.angle);
//   ctx.arc(0, 0, f.r, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.restore();
// }

// // Bokeh işıqlarını çəkmək
// function drawBokeh() {
//   for (let l of bokehLights) {
//     const gradient = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
//     gradient.addColorStop(0, `rgba(255,255,255,${l.a})`);
//     gradient.addColorStop(0.5, `rgba(255,255,255,${l.a / 2})`);
//     gradient.addColorStop(1, `rgba(255,255,255,0)`);

//     ctx.beginPath();
//     ctx.fillStyle = gradient;
//     ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
//     ctx.fill();

//     // yüngül hərəkət
//     l.x += l.speedX;
//     l.y += l.speedY;

//     // radius dəyişimi (böyüyür/kiçilir)
//     if (l.growing) {
//       l.r += l.grow;
//       if (l.r >= l.maxR) l.growing = false;
//     } else {
//       l.r -= l.grow;
//       if (l.r <= l.minR) l.growing = true;
//     }

//     // ekran kənarı yoxlaması
//     if (l.x < 0) l.x = width;
//     if (l.x > width) l.x = 0;
//     if (l.y < 0) l.y = height;
//     if (l.y > height) l.y = 0;
//   }
// }

// // Snowflake-ləri və bokeh-i çəkmək
// function drawAll() {
//   ctx.clearRect(0, 0, width, height);

//   const night = isNight();

//   drawBokeh();

//   for (let layer of layers) {
//     for (let f of layer) {
//       drawSnowflake(f, night);

//       // Qar hərəkəti
//       f.y += f.d;
//       f.x += Math.sin(f.y * 0.01) * 0.3;
//       f.angle += 0.002;

//       if (f.y > height) {
//         f.y = 0;
//         f.x = Math.random() * width;
//         f.angle = Math.random() * Math.PI;
//       }
//     }
//   }
// }

// // Animasiya loop
// function update() {
//   drawAll();
//   requestAnimationFrame(update);
// }

// // Resize zamanı yenidən ölçü və layer yarat
// window.addEventListener("resize", () => {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;
//   createSnowflakes();
// });

// // Başla
// createSnowflakes();
// update();



const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let layers = [];
let bokehLights = [];

// Layer yaratmaq funksiyası
function createLayer(count, maxR, minD, maxD, maxO, maxBlur) {
  let snowflakes = [];
  for (let i = 0; i < count; i++) {
    let r = Math.random() * maxR + 1;
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: r,
      d: Math.random() * (maxD - minD) + minD,
      o: Math.random() * maxO + 0.3,
      blur: Math.random() * maxBlur + 1,
      angle: Math.random() * Math.PI * 2,
      tilt: Math.random() * 0.5 - 0.25,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.2) * 0.5,
      stretch: Math.random() * 0.6 + 0.4 // qar dənəsi daha oval
    });
  }
  return snowflakes;
}

// Bokeh işıqları
function createBokeh(count) {
  bokehLights = [];
  for (let i = 0; i < count; i++) {
    bokehLights.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 50 + 20,
      a: Math.random() * 0.25 + 0.05,
      speedX: (Math.random() - 0.5) * 0.05,
      speedY: (Math.random() - 0.5) * 0.05,
      grow: Math.random() * 0.05 + 0.01,
      maxR: Math.random() * 40 + 30,
      minR: Math.random() * 10 + 10,
      growing: true
    });
  }
}

// Gecə rejimi
function isNight() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 7;
}

// Snowflakes yarat
function createSnowflakes() {
  layers = [];
  layers.push(createLayer(60, 3, 0.5, 1.0, 0.9, 5)); // ön plan böyük
  layers.push(createLayer(50, 2, 0.3, 0.6, 0.7, 3)); // orta plan
  layers.push(createLayer(40, 1.5, 0.1, 0.4, 0.5, 2)); // arxa plan
  createBokeh(25);
}

// Qar dənəsini çəkmək
function drawSnowflake(f, night) {
  ctx.save();
  ctx.beginPath();
  let opacity = night ? Math.min(f.o + 0.2, 1) : f.o;
  let blur = night ? Math.min(f.blur + 1, 6) : f.blur;
  ctx.fillStyle = `rgba(255,255,255,${opacity})`;
  ctx.shadowColor = "white";
  ctx.shadowBlur = blur;
  ctx.translate(f.x, f.y);
  ctx.rotate(f.angle);
  ctx.scale(f.stretch, 1); // daha oval və realistik
  ctx.arc(0, 0, f.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Bokeh
function drawBokeh() {
  for (let l of bokehLights) {
    const gradient = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
    gradient.addColorStop(0, `rgba(255,255,255,${l.a})`);
    gradient.addColorStop(0.5, `rgba(255,255,255,${l.a/2})`);
    gradient.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(l.x, l.y, l.r, 0, Math.PI*2);
    ctx.fill();

    l.x += l.speedX;
    l.y += l.speedY;
    if (l.growing) {
      l.r += l.grow;
      if (l.r >= l.maxR) l.growing = false;
    } else {
      l.r -= l.grow;
      if (l.r <= l.minR) l.growing = true;
    }

    if (l.x < 0) l.x = width;
    if (l.x > width) l.x = 0;
    if (l.y < 0) l.y = height;
    if (l.y > height) l.y = 0;
  }
}

// Hər şeyi çəkmək
function drawAll() {
  ctx.clearRect(0,0,width,height);
  const night = isNight();
  drawBokeh();

  for (let layer of layers) {
    for (let f of layer) {
      drawSnowflake(f, night);

      f.y += f.d;
      f.x += Math.sin(f.y * 0.01) * 0.3 + f.speedX;
      f.angle += 0.002 + f.tilt * 0.001;

      if (f.y > height) {
        f.y = 0;
        f.x = Math.random() * width;
        f.angle = Math.random() * Math.PI * 2;
      }
    }
  }
}

// Animasiya loop
function update() {
  drawAll();
  requestAnimationFrame(update);
}

window.addEventListener("resize", ()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  createSnowflakes();
});

// Başla
createSnowflakes();
update();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noIndex = 0;

const noTexts = [  
  " Dum Dum 🥺",
  "Wait, what? 😳",
  "You sure about that? 🤨",
  "Hmm… think again 😌",
  "Don’t play with me 🥺",
  "Okay okay… just say yes 💖"
];

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function fireConfetti() {
  const pieces = [];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      life: 100
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      p.life--;
    });

    if (pieces.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}


/* YES → go to poem page */
yesBtn.addEventListener("click", () => {
  fireConfetti();
  setTimeout(() => {
    window.location.href = "yes.html";
  }, 700);
});


/* NO → change text + grow YES */
function handleNoClick() {
  noBtn.textContent = noTexts[noIndex % noTexts.length];
  noIndex++;

  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
yesBtn.style.animation = "bounce 0.4s";
yesBtn.addEventListener("animationend", () => {
  yesBtn.style.animation = "";
}, { once: true });

}

noBtn.addEventListener("click", handleNoClick);
noBtn.addEventListener("touchstart", handleNoClick);



const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

setInterval(createHeart, 700);


const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let isPlaying = false;

musicToggle.addEventListener("click", async () => {
  try {
    if (!isPlaying) {
      await music.play(); // MUST be inside click
      musicToggle.textContent = "🔇 Mute Music";
    } else {
      music.pause();
      musicToggle.textContent = "🎶 Play Music";
    }
    isPlaying = !isPlaying;
  } catch (err) {
    console.error("Music play failed:", err);
  }
});

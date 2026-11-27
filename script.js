// Lightweight interactions: mobile navigation, typewriter, reveal-on-scroll and ambient particles.
const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const words = ["digital experiences", "useful software", "creative solutions"];
let wordIndex = 0, charIndex = 0, deleting = false;
const typed = document.querySelector("#typed");
function typeLoop() {
  if (!typed) return;
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) { charIndex++; setTimeout(typeLoop, 85); }
  else if (!deleting) { deleting = true; setTimeout(typeLoop, 1200); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeLoop, 42); }
  else { deleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(typeLoop, 250); }
}
typeLoop();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contact-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent("Portfolio contact from " + data.get("name"));
  const body = encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\n\n" + data.get("message"));
  window.location.href = "mailto:ghousiyamohideen@gmail.com?subject=" + subject + "&body=" + body;
});

const canvas = document.querySelector("#stars"), ctx = canvas.getContext("2d");
let particles = [];
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px"; canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({length: Math.min(85, Math.floor(innerWidth / 15))}, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.4 + .25, speed: Math.random() * .22 + .04, alpha: Math.random() * .5 + .15
  }));
}
function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.y -= p.speed; if (p.y < -3) { p.y = innerHeight + 3; p.x = Math.random() * innerWidth; }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(130,205,218,${p.alpha})`; ctx.fill();
  });
  requestAnimationFrame(animate);
}
resize(); animate(); addEventListener("resize", resize);
const glow = document.querySelector(".pointer-glow");
addEventListener("pointermove", e => { if (glow) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; } });

// ------- diagnostic dial -------
const SETTINGS = [
  { key:'Washer', angle:-150,
    title:"Won't drain, won't spin, leaking",
    body:"Often a pump, belt, or door-lock issue. Describe the symptom to RG Prado by phone — some fixes don't even need a visit." },
  { key:'Dryer', angle:-90,
    title:"No heat, long dry times, squealing",
    body:"Usually a heating element, thermal fuse, or worn drum roller. RG Prado can often narrow it down before arriving." },
  { key:'Fridge', angle:-30,
    title:"Not cooling, ice buildup, water on floor",
    body:"Could be the defrost system, fan, or a clogged drain line. Don't lose a fridge full of groceries — call early." },
  { key:'Stove', angle:30,
    title:"Burner won't heat, oven uneven, error codes",
    body:"Elements, igniters, and control boards are RG Prado's bread and butter. Gas or electric, residential or commercial." },
  { key:'Dishwasher', angle:90,
    title:"Not draining, dishes still dirty, leaks",
    body:"Frequently a spray arm, pump, or float switch. A quick phone chat often points to the exact part needed." },
  { key:'Air Conditioner', angle:150,
    title:"Not cooling, weak airflow, ice on the unit",
    body:"Often a clogged filter, low refrigerant, or a failing capacitor. Call before the next heat wave hits — summer books up fast." }
];

const labelsEl = document.getElementById('knobLabels');
const knob = document.getElementById('knob');
const dxLabel = document.getElementById('dxLabel');
const dxTitle = document.getElementById('dxTitle');
const dxBody  = document.getElementById('dxBody');
const CALL = ' <a href="tel:+12042283686">Call now</a>';

function placeLabels(){
  const wrapSize = labelsEl.parentElement.offsetWidth; // actual .knob-wrap size
  const c = wrapSize / 2;
  const r = c - 12; // keep labels just inside the wrap edge
  labelsEl.querySelectorAll('button').forEach((b, i) => {
    const rad = (SETTINGS[i].angle - 90) * Math.PI / 180;
    b.style.left = (c + r * Math.cos(rad)) + 'px';
    b.style.top  = (c + r * Math.sin(rad)) + 'px';
  });
}

SETTINGS.forEach((s, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = s.key;
  b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
  b.addEventListener('click', () => select(i));
  labelsEl.appendChild(b);
});
placeLabels();
window.addEventListener('resize', placeLabels);

function select(i){
    const s = SETTINGS[i];
    knob.style.transform = 'rotate(' + s.angle + 'deg)';
    dxLabel.textContent = s.key + ' · Common faults';
    dxTitle.textContent = s.title;
    dxBody.innerHTML = s.body + CALL;
    labelsEl.querySelectorAll('button').forEach((btn, j) => {
        btn.setAttribute('aria-pressed', j === i ? 'true' : 'false');
    });
}
knob.style.transform = 'rotate(' + SETTINGS[0].angle + 'deg)';

// ------- request form -------
document.getElementById('reqForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const fd = new FormData(form);
    fd.set('_subject', 'Service request: ' + fd.get('appliance') + ' — ' + fd.get('name'));
    const res = await fetch(form.action, {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('send failed');
    document.getElementById('formFields').style.display = 'none';
    document.getElementById('formDone').style.display = 'block';
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Send request';
    alert("Couldn't send right now — please call or text (204) 228-3686 instead.");
  }
});

  // ------- scroll reveal -------
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
};

// ------- opening slideshow -------
(function(){
  const show = document.getElementById('slideshow');
  if (!show) return;

  // --- your photos ---
  const SLIDE_COUNT = 19;
  const EXT = 'jpg'; // change to 'png' / 'jpeg' if that's what your files are
  const src = i => 'images/image_' + i + '.' + EXT;

  const dotsEl = document.getElementById('slideDots');
  const cap = show.querySelector('.slide-cap');
  const slides = [];

  for (let i = 1; i <= SLIDE_COUNT; i++) {
  const s = document.createElement('div');
  s.className = 'slide' + (i === 1 ? ' is-active' : '');

  const bg = document.createElement('div');
  bg.className = 'slide-bg';
  bg.style.backgroundImage = "url('" + src(i) + "')";

  const img = document.createElement('img');
  img.className = 'slide-img';
  img.src = src(i);
  img.alt = '';
  img.loading = i === 1 ? 'eager' : 'lazy';

  s.appendChild(bg);
  s.appendChild(img);
  show.insertBefore(s, cap);
  slides.push(s);
}

  let current = 0, timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('role','tab');
    d.setAttribute('aria-label','Slide ' + (i + 1));
    d.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    d.addEventListener('click', () => { go(i); restart(); });
    dotsEl.appendChild(d);
  });
  const dots = dotsEl.querySelectorAll('button');

  function go(i){
    slides[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected','false');
    current = i;
    slides[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected','true');
  }
  function next(){ go((current + 1) % slides.length); }
  function restart(){
    if (reduced) return;
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }
  show.addEventListener('mouseenter', () => clearInterval(timer));
  show.addEventListener('mouseleave', restart);
  restart();
})();

// [...document.querySelectorAll('*')].filter(el => el.scrollWidth > document.documentElement.clientWidth).forEach(el => console.log(el, el.scrollWidth));
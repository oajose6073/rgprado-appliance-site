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
const R = 128; // label radius
const labelsEl = document.getElementById('knobLabels');
const knob = document.getElementById('knob');
const dxLabel = document.getElementById('dxLabel');
const dxTitle = document.getElementById('dxTitle');
const dxBody  = document.getElementById('dxBody');
const CALL = ' <a href="tel:+12042283686">Call now</a>';

SETTINGS.forEach((s, i) => {
    const rad = (s.angle - 90) * Math.PI / 180;
    const x = 140 + R * Math.cos(rad);
    const y = 140 + R * Math.sin(rad);
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = s.key;
    b.style.left = x + 'px';
    b.style.top = y + 'px';
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', () => select(i));
    labelsEl.appendChild(b);
});

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
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stars = document.querySelector('#stars');
const sc = stars.getContext('2d');
const wave = document.querySelector('#wave');
const wc = wave.getContext('2d');
const pattern = document.querySelector('#pattern');
const speed = document.querySelector('#speed');
const pause = document.querySelector('#pause');
let running = !reduced, phase = 0, previous = 0;
function sizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = rect.width * ratio; canvas.height = rect.height * ratio;
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
  return rect;
}
function drawStars() {
  const r = sizeCanvas(stars); sc.clearRect(0, 0, r.width, r.height);
  let seed = 14;
  function random() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (let i = 0; i < 150; i++) {
    sc.beginPath(); sc.arc(random()*r.width, random()*r.height, random()*1.3+.3,0,Math.PI*2);
    sc.fillStyle = document.body.classList.contains('daylight') ? '#77628b35' : '#c8c8f065'; sc.fill();
  }
}
// Axisymmetric real spherical harmonic, proportional to P_l(cos(theta)).
// The symmetry axis is vertical in the sky plane (equator-on view).
function legendre(l, x) {
  if (l === 0) return 1;
  let previous = 1, current = x;
  for (let n = 2; n <= l; n++) {
    const next = ((2*n-1)*x*current-(n-1)*previous)/n;
    previous = current; current = next;
  }
  return current;
}
function drawWave() {
  const width = wave.clientWidth, height = wave.clientHeight;
  wc.clearRect(0,0,width,height);
  const radius = Math.min(width,height)*.39;
  const l = Number(pattern.value), time = Math.cos(phase);
  const neutral = [42,38,62], positive = [173,66,255], negative = [255,116,24];
  // Each horizontal strip is a constant-colatitude zone on the visible sphere.
  // Orthographic projection: cos(theta) = -y/R. Geometry stays fixed.
  wc.save();
  wc.beginPath();wc.arc(width/2,height/2,radius,0,Math.PI*2);wc.clip();
  for(let y=-radius;y<radius;y+=1) {
    const value = legendre(l,Math.max(-1,Math.min(1,-(y+.5)/radius)))*time;
    const target = value>=0 ? positive : negative;
    const rgb=neutral.map((v,i)=>Math.round(v+(target[i]-v)*Math.abs(value)));
    wc.fillStyle=`rgb(${rgb.join(',')})`;
    wc.fillRect(width/2-radius,height/2+y,2*radius,1.1);
  }
  wc.restore();
  wc.beginPath();wc.arc(width/2,height/2,radius,0,Math.PI*2);
  wc.strokeStyle='#aba6c9';wc.lineWidth=1;wc.stroke();
  wave.setAttribute('aria-label',`Axisymmetric scalar pattern: degree ${l}, m = 0, equator-on. Colours change while the stellar outline remains fixed.`);
}
function resize(){drawStars();sizeCanvas(wave);drawWave();}
function frame(now){if(running){phase+=Math.min((now-previous)/1000,.05)*Number(speed.value)*2;drawWave();}previous=now;requestAnimationFrame(frame);}
function updatePause(){pause.textContent=running?'Pause animation':'Play animation';pause.setAttribute('aria-pressed',String(!running));}
pause.addEventListener('click',()=>{running=!running;updatePause();});
for(const input of [pattern,speed])input.addEventListener('input',()=>{document.querySelector(`#${input.id}-value`).textContent=input.value;drawWave();});
document.querySelector('#theme').addEventListener('click',event=>{const day=document.body.classList.toggle('daylight');event.target.textContent=day?'Switch to night sky':'Switch to daylight';drawStars();drawWave();});
window.addEventListener('resize',resize);
updatePause();resize();requestAnimationFrame(frame);



const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, shapes=[];
function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; shapes=[]; for(let i=0;i<40;i++) shapes.push(randomShape()); }
function randomShape(){
  return {
    x: Math.random()*W,
    y: Math.random()*H,
    vx:(Math.random()-0.5)*0.8,
    vy:(Math.random()-0.5)*0.8,
    size: 8+Math.random()*60,
    rot: Math.random()*Math.PI,
    rSpeed:(Math.random()-0.5)*0.03,
    type: ['circle','triangle','square'][Math.floor(Math.random()*3)],
    alpha: 0.12 + Math.random()*0.6
  }
}
function draw(){
  ctx.clearRect(0,0,W,H);
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'rgba(0,0,0,0.05)');
  g.addColorStop(1,'rgba(0,0,0,0.02)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  for(let s of shapes){
    s.x += s.vx;
    s.y += s.vy;
    s.rot += s.rSpeed;
    if(s.x < -150) s.x = W+150;
    if(s.x > W+150) s.x = -150;
    if(s.y < -150) s.y = H+150;
    if(s.y > H+150) s.y = -150;

    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.translate(s.x,s.y);
    ctx.rotate(s.rot);
    const size = s.size;
    ctx.shadowColor = 'rgba(0,255,150,0.25)';
    ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(0,255,102,0.12)';
    if(s.type==='circle'){
      ctx.beginPath(); ctx.arc(0,0,size/2,0,Math.PI*2); ctx.fill();
    } else if(s.type==='square'){
      ctx.fillRect(-size/2,-size/2,size,size);
    } else {
      ctx.beginPath();
      ctx.moveTo(0,-size/2);
      ctx.lineTo(size/2,size/2);
      ctx.lineTo(-size/2,size/2);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize();
draw();

document.getElementById('open-btn').addEventListener('click', e=>{
  window.open('https://t.me/lime_sxc','_blank');
});

document.getElementById('download-btn').addEventListener('click', async (e)=>{
  e.preventDefault();
  const blob = new Blob(["This is the project ZIP (replica)."], {type:'application/octet-stream'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'project_video_replica.zip';
  document.body.appendChild(a); a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

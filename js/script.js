
/* Dynamic tagline on the home page */
document.addEventListener('DOMContentLoaded', () => {
    const tag = document.getElementById('tagline');
    if (tag){
      const lines=[
        'Every walk is a tail‑wagging adventure ',
        'Affordable insured & totally dog‑obsessed',
        'Even when raining we walk, you relax',
        'Trusted by Dublin’s happiest dogs'
      ];
      tag.textContent = lines[Math.random()*lines.length|0];
    }
  });
  
  /*Gallery captions */
  document.addEventListener('click', e=>{
    if(e.target.classList.contains('gallery-img')){
      e.target.nextElementSibling.classList.toggle('d-none');
    }
  });
  
  /* Auto‑fill service if u click on services */
  document.addEventListener('DOMContentLoaded',()=>{
    const p = new URLSearchParams(location.search).get('service');
    const sel = document.getElementById('service');
    if(p && sel){
      [...sel.options].forEach(o=>{ if(o.textContent.trim()===p.trim()) o.selected=true;});
    }
  });
  
  /* Bootstrap validation */
  (()=>{
    const forms=document.querySelectorAll('form');
    forms.forEach(f=>{
      f.addEventListener('submit',e=>{
        if(!f.checkValidity()){ e.preventDefault(); e.stopPropagation();}
        f.classList.add('was-validated');
      });
    });
  })();
  
  /* Mini game*/
  (()=>{
    const startBtn = document.getElementById('startGame');
    if(!startBtn) return;                    // game only exists on home page
  
    const bone     = document.getElementById('bone');
    const scoreBox = document.getElementById('score');
    const timerBox = document.getElementById('timer');
    const area     = document.getElementById('game-area');
  
    const modalEl  = document.getElementById('gameOverModal');
    const finalBox = document.getElementById('finalScore');
    const playBtn  = document.getElementById('restartGame');
  
    let score=0, time=20, tick=null, running=false;
  
    function randomPos(){
      const maxX = area.clientWidth  - bone.offsetWidth;
      const maxY = area.clientHeight - bone.offsetHeight;
      bone.style.left = Math.random()*maxX + 'px';
      bone.style.top  = Math.random()*maxY + 'px';
    }
  
    function updateTimer(){
      timerBox.textContent = time + ' s';
    }
  
    function endGame(){
      clearInterval(tick); tick=null; running=false;
      bone.style.display='none';
      startBtn.textContent='Start game';
      finalBox.textContent=score;
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
  
    function startGame(){
      if(tick) clearInterval(tick);
      score=0; time=20; running=true;
      scoreBox.textContent=score;
      updateTimer();
      bone.style.display='inline';
      randomPos();
      startBtn.textContent='Restart game';
  
      tick=setInterval(()=>{
        time--;
        updateTimer();
        if(time<=0){ endGame(); }
      },1000);
    }
  
    bone.addEventListener('click',()=>{
      score++; scoreBox.textContent=score; randomPos();
    });
  
    startBtn.addEventListener('click',startGame);
  
    playBtn.addEventListener('click',()=>{
      bootstrap.Modal.getInstance(modalEl).hide();
      startGame();
    });
  })();
  
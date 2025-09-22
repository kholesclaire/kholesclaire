// EcoRide — app.js
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', ()=>{
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        navList && navList.classList.remove('open');
      }
    });
  });

  // Demo counters with randomization
  const ebike = document.getElementById('ebike-count');
  const escooter = document.getElementById('escooter-count');
  const refresh = document.getElementById('refresh-demo');
  function randomize(){
    if(ebike) ebike.textContent = (1000 + Math.floor(Math.random()*800)).toLocaleString();
    if(escooter) escooter.textContent = (700 + Math.floor(Math.random()*700)).toLocaleString();
  }
  refresh && refresh.addEventListener('click', ()=>{
    randomize();
    const note = document.querySelector('.tiny-note');
    if(note){
      note.textContent = 'Demo refreshed at ' + new Date().toLocaleTimeString();
    }
  });

  // Contact form validation (front-end only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  function setError(id, msg){
    const el = document.querySelector('.error[data-for="'+id+'"]');
    if(el) el.textContent = msg || '';
  }
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    setError('name',''); setError('email',''); setError('city','');
    const data = new FormData(form);
    let ok = true;
    if(!data.get('name')){ setError('name','Please enter your name.'); ok=false; }
    const email = String(data.get('email')||'');
    if(!email || !validateEmail(email)){ setError('email','Please enter a valid email.'); ok=false; }
    if(!data.get('city')){ setError('city','Please enter your city.'); ok=false; }

    if(ok){
      status.textContent = 'Thanks! Your request has been recorded (demo only).';
      form.reset();
      setTimeout(()=> status.textContent = '', 4000);
    }else{
      status.textContent = 'Please fix the errors above.';
      setTimeout(()=> status.textContent = '', 4000);
    }
  });

  // Footer year
  const year = document.getElementById('year');
  if(year){ year.textContent = new Date().getFullYear(); }
})();
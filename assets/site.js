(function(){
 // crossfading hero images
 document.querySelectorAll('.hero .bg').forEach(function(bg){
  var imgs=bg.querySelectorAll('img'); if(imgs.length<2) return; var i=0;
  setInterval(function(){imgs[i].classList.remove('on'); i=(i+1)%imgs.length; imgs[i].classList.add('on');},5000);
 });
 // rotating words (Shape of Language)
 var hw=document.querySelector('[data-words]');
 if(hw){var words=hw.getAttribute('data-words').split('|'),k=0;
  setInterval(function(){hw.style.opacity=0;setTimeout(function(){k=(k+1)%words.length;hw.textContent=words[k];hw.style.opacity=1;},450);},3200);}
 // lightbox
 var links=[].slice.call(document.querySelectorAll('.work a[data-full]')); if(!links.length) return;
 var lb=document.createElement('div'); lb.className='lb';
 lb.innerHTML='<button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><div class="cap"></div><div class="meta"></div><button class="n" aria-label="Next">›</button>';
 document.body.appendChild(lb);
 var im=lb.querySelector('img'),cap=lb.querySelector('.cap'),meta=lb.querySelector('.meta'),cur=0;
 function show(n){cur=(n+links.length)%links.length;im.src=links[cur].getAttribute('data-full');im.alt=cap.textContent=links[cur].getAttribute('data-title');meta.innerHTML='';(links[cur].getAttribute('data-meta')||'').split(' | ').filter(Boolean).forEach(function(t){var d=document.createElement('div');d.textContent=t;meta.appendChild(d);});lb.classList.add('open');}
 function hide(){lb.classList.remove('open');}
 links.forEach(function(a,n){a.addEventListener('click',function(e){e.preventDefault();show(n);});});
 lb.querySelector('.x').onclick=hide; lb.querySelector('.p').onclick=function(e){e.stopPropagation();show(cur-1);}; lb.querySelector('.n').onclick=function(e){e.stopPropagation();show(cur+1);};
 lb.addEventListener('click',function(e){if(e.target===lb)hide();});
 document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')hide();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
})();

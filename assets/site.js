(function(){
 // newsletter popup (pages without the popup keep the link as a jump to the inline form)
 var nd=document.getElementById('newsletter'); if(!nd) return;
 [].forEach.call(document.querySelectorAll('[data-newsletter]'),function(a){a.addEventListener('click',function(e){e.preventDefault();if(nd.showModal)nd.showModal();else nd.setAttribute('open','');});});
 nd.addEventListener('click',function(e){if(e.target===nd)nd.close();});
})();
(function(){
 // contact / inquiry modal
 var dlg=document.getElementById('contact'); if(dlg){
  var form=dlg.querySelector('.c-form'),done=dlg.querySelector('.c-done'),err=dlg.querySelector('.c-err'),btn=dlg.querySelector('.c-send');
  function open(e){if(e)e.preventDefault();form.hidden=false;done.hidden=true;err.textContent='';btn.disabled=false;if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');}
  [].forEach.call(document.querySelectorAll('[data-contact]'),function(b){b.addEventListener('click',open);});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
  dlg.querySelector('.c-again').addEventListener('click',function(){form.reset();dlg.close();});
  function subscribe(email){ // add to the MailerLite list through a hidden form post
   var n='mlframe'+Date.now(),f=document.createElement('iframe');f.name=n;f.style.display='none';document.body.appendChild(f);
   var h=document.createElement('form');h.method='post';h.action=dlg.getAttribute('data-ml');h.target=n;h.style.display='none';
   [['fields[email]',email],['ml-submit','1'],['anticsrf','true']].forEach(function(kv){var i=document.createElement('input');i.type='hidden';i.name=kv[0];i.value=kv[1];h.appendChild(i);});
   document.body.appendChild(h);h.submit();setTimeout(function(){h.remove();f.remove();},8000);
  }
  form.addEventListener('submit',function(e){
   e.preventDefault(); err.textContent='';
   var d=new FormData(form),name=(d.get('name')||'').trim(),email=(d.get('email')||'').trim(),msg=(d.get('message')||'').trim();
   if(!name||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||!msg){err.textContent='Please add your name, a valid email, and a message.';return;}
   if(d.get('botcheck'))return;
   var sub=!!d.get('subscribe'),key=dlg.getAttribute('data-key'),fallback=dlg.getAttribute('data-mailto');
   function ok(){if(sub)subscribe(email);form.hidden=true;done.hidden=false;form.reset();}
   if(!key){ // no form service configured yet: open the visitor's email app
    if(!fallback){err.textContent='Sending is not set up yet.';return;}
    window.location.href='mailto:'+fallback+'?subject='+encodeURIComponent('Inquiry from '+name)+'&body='+encodeURIComponent(msg+'\n\n'+name+' <'+email+'>');
    ok();return;
   }
   btn.disabled=true;
   fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({access_key:key,subject:'Website inquiry from '+name,from_name:'ryanericksonart.com',name:name,email:email,message:msg,subscribe:sub?'yes':'no'})})
   .then(function(r){return r.json();}).then(function(j){if(j.success)ok();else throw 0;})
   .catch(function(){btn.disabled=false;err.textContent='Something went wrong. Please try again in a moment.';});
  });
 }
})();
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

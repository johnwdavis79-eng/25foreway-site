(function(){
  var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('is-open');t.setAttribute('aria-expanded',o?'true':'false');t.textContent=o?'Close':'Menu';});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('is-open')){n.classList.remove('is-open');t.setAttribute('aria-expanded','false');t.textContent='Menu';t.focus();}});}
  // FORM SETUP: paste a static form-service endpoint (e.g. https://formspree.io/f/XXXX or https://formsubmit.co/ajax/<address>)
  // into ENDPOINTS. While a value is empty, that form validates but tells the visitor nothing was sent.
  var ENDPOINTS={'inquiry-form':'https://formsubmit.co/ajax/johnwdavis79@gmail.com','signup-form':'https://formsubmit.co/ajax/johnwdavis79@gmail.com'};
  var q=new URLSearchParams(location.search).get('topic'),sel=document.getElementById('f-topic');
  if(q&&sel){for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===q){sel.selectedIndex=i;}}}
  document.querySelectorAll('form.js-form').forEach(function(f){
    var s=f.querySelector('.form-status');
    f.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      f.querySelectorAll('[data-required]').forEach(function(el){
        var fld=el.closest('.field'),err=fld.querySelector('.field__err'),v=el.value.trim(),msg='';
        if(!v)msg='Required.';else if(el.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))msg='Enter a valid email address.';
        fld.classList.toggle('field--error',!!msg);if(err)err.textContent=msg;if(msg)ok=false;
      });
      if(!ok){var first=f.querySelector('.field--error input, .field--error textarea, .field--error select');if(first)first.focus();return;}
      var ep=ENDPOINTS[f.id];
      function show(m){s.textContent=m;s.classList.add('is-visible');s.focus();}
      if(!ep){show(f.id==='signup-form'?'Thank you. Sign-up is in preview and not yet connected, so your address has not been saved.':'Thank you. This form is in preview and not yet connected, so your message has not been sent. Please keep a copy of your note.');return;}
      var b=f.querySelector('button[type=submit]');b.disabled=true;
      fetch(ep,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){
        if(!r.ok)throw 0;f.reset();show(f.id==='signup-form'?'Thank you. You are on the list.':'Thank you. Your message has been sent.');
      }).catch(function(){s.innerHTML='Sorry, that did not go through. Please email <a href="mailto:johnwdavis79@gmail.com?subject=25%20Foreway">John W. Davis</a> directly.';s.classList.add('is-visible');s.focus();}).finally(function(){b.disabled=false;});
    });
  });
})();

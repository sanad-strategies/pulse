(function(){
  var top=document.querySelector('header.top'),tg=document.querySelector('.menu-toggle');
  if(tg)tg.addEventListener('click',function(){top.classList.toggle('open')});
  document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open')})});

  // starfield
  var c=document.getElementById('stars'),x=c.getContext('2d'),S=[],W,H,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){W=c.width=innerWidth;H=c.height=innerHeight;S=[];var n=Math.round(W*H/9000);for(var i=0;i<n;i++)S.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,z:Math.random()*.9+.1,t:Math.random()*6.28})}
  var sy=0;
  function draw(t){x.clearRect(0,0,W,H);for(var i=0;i<S.length;i++){var s=S[i],y=(s.y-sy*s.z*.25)%H;if(y<0)y+=H;var a=.35+.65*Math.abs(Math.sin(t/1400+s.t));x.globalAlpha=a*s.z;x.fillStyle=i%7==0?'#f2c9c9':i%5==0?'#a9c6f2':'#fff';x.beginPath();x.arc(s.x,y,s.r,0,6.283);x.fill()}if(!reduce)requestAnimationFrame(draw)}
  size();addEventListener('resize',size);requestAnimationFrame(draw);

  // hero scroll progress
  var hero=document.querySelector('.hero'),st=document.querySelector('.stage');
  function onScroll(){sy=scrollY;if(!hero||reduce)return;var tot=hero.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/tot));st.style.setProperty('--p',p.toFixed(4))}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();

  // tap to flip gold angle on touch screens
  document.querySelectorAll('.pic[data-flip]').forEach(function(p){p.addEventListener('click',function(){p.classList.toggle('flip')})});
})();

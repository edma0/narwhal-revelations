(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function norm(s){return s.toLowerCase()}
function applyFilter(t){
  var f=$('#f-'+t.id),q=f?norm(f.value.trim()):'';
  var chips=$('.chips[data-table="'+t.id+'"]'),val=chips?($('.chip.on',chips)||{getAttribute:function(){return''}}).getAttribute('data-val'):'';
  var shown=0,rows=$$('tbody tr',t);
  rows.forEach(function(tr){
    var cells=$$('td',tr).map(function(td){return td.textContent.trim()});
    var ok=(!q||norm(cells.join(' ')).indexOf(q)>-1)&&(!val||cells.indexOf(val)>-1);
    tr.hidden=!ok;if(ok)shown++;
  });
  var c=$('#c-'+t.id);if(c)c.textContent=shown===rows.length?rows.length+' rows':shown+' of '+rows.length+' rows';
}
function sortBy(t,i,th){
  var num=th.getAttribute('data-type')==='num',dir=th.getAttribute('aria-sort')==='ascending'?'descending':'ascending';
  $$('th',t).forEach(function(h){h.setAttribute('aria-sort','none')});
  th.setAttribute('aria-sort',dir);
  var tb=$('tbody',t),rows=$$('tr',tb);
  rows.sort(function(a,b){
    var x=a.children[i].textContent.trim(),y=b.children[i].textContent.trim(),r;
    if(num){r=(parseFloat(x)||0)-(parseFloat(y)||0)}else{r=x.localeCompare(y,undefined,{numeric:true,sensitivity:'base'})}
    return dir==='ascending'?r:-r;
  });
  rows.forEach(function(r){tb.appendChild(r)});
}
$$('table.sortable').forEach(function(t){
  $$('th',t).forEach(function(th,i){
    th.addEventListener('click',function(){sortBy(t,i,th)});
    th.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();sortBy(t,i,th)}});
  });
  applyFilter(t);
});
$$('input.filter').forEach(function(f){f.addEventListener('input',function(){applyFilter($('#'+f.getAttribute('data-table')))})});
$$('.chips').forEach(function(g){
  g.addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    var was=b.classList.contains('on')&&b.getAttribute('data-val')!=='';
    $$('.chip',g).forEach(function(c){c.classList.remove('on')});
    (was?$('.chip[data-val=""]',g):b).classList.add('on');
    applyFilter($('#'+g.getAttribute('data-table')));
  });
});
$$('.tabs').forEach(function(g){
  var tabs=$$('.tab',g);
  tabs.forEach(function(b){b.addEventListener('click',function(){
    tabs.forEach(function(o){o.classList.remove('on');o.setAttribute('aria-selected','false');$('#'+o.getAttribute('data-pane')).classList.remove('on')});
    b.classList.add('on');b.setAttribute('aria-selected','true');$('#'+b.getAttribute('data-pane')).classList.add('on');
  })});
});
var links=$$('.nav a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});
  secs.forEach(function(s){if(s)io.observe(s)});
}
})();

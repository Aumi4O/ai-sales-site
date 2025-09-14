(function(){
  var params=new URLSearchParams(location.search);
  var base=document.body.getAttribute('data-base')||'#';
  var campaign=document.body.getAttribute('data-campaign')||'';
  var utm_source=params.get('utm_source')||'landing';
  var utm_medium=params.get('utm_medium')||'web';
  var utm_campaign=params.get('utm_campaign')||campaign;
  var subid=params.get('subid');
  var href=params.get('link')||base;
  try{
    var u=new URL(href);
    u.searchParams.set('utm_source',utm_source);
    u.searchParams.set('utm_medium',utm_medium);
    if(utm_campaign)u.searchParams.set('utm_campaign',utm_campaign);
    if(subid)u.searchParams.set('subid',subid);
    href=u.toString();
  }catch(e){}
  var a=document.getElementById('cta');
  if(a)a.href=href;
})();


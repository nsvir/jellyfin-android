﻿var SURROGATE_PAIR_REGEXP=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,NON_ALPHANUMERIC_REGEXP=/([^\#-~| |!])/g;var hiddenPre=document.createElement("pre");function htmlDecode(value){if(!value){return'';}
hiddenPre.innerHTML=value.replace(/</g,"&lt;");return hiddenPre.textContent;}
function htmlEncode(value){return value.replace(/&/g,'&amp;').replace(SURROGATE_PAIR_REGEXP,function(value){var hi=value.charCodeAt(0);var low=value.charCodeAt(1);return'&#'+(((hi-0xD800)*0x400)+(low-0xDC00)+0x10000)+';';}).replace(NON_ALPHANUMERIC_REGEXP,function(value){return'&#'+value.charCodeAt(0)+';';}).replace(/</g,'&lt;').replace(/>/g,'&gt;');}
Array.prototype.remove=function(from,to){var rest=this.slice((to||from)+1||this.length);this.length=from<0?this.length+from:from;return this.push.apply(this,rest);};$.fn.checked=function(value){if(value===true||value===false){return $(this).each(function(){this.checked=value;});}else{return $(this).is(':checked');}};$.fn.buttonEnabled=function(enabled){return enabled?this.attr('disabled','').removeAttr('disabled'):this.attr('disabled','disabled');};if(!Array.prototype.filter){Array.prototype.filter=function(fun){"use strict";if(this==null)
throw new TypeError();var t=Object(this);var len=t.length>>>0;if(typeof fun!="function")
throw new TypeError();var res=[];var thisp=arguments[1];for(var i=0;i<len;i++){if(i in t){var val=t[i];if(fun.call(thisp,val,i,t))
res.push(val);}}
return res;};}
var WebNotifications={show:function(data){if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.notification){if(!WebNotifications.lastId){WebNotifications.lastId=new Date().getDate()+new Date().getMilliseconds();}
WebNotifications.lastId++;window.cordova.plugins.notification.local.schedule({id:WebNotifications.lastId,title:data.title,text:data.body,icon:data.icon});}
else if(window.Notification){var level=Notification.permissionLevel?Notification.permissionLevel():Notification.permission;if(level==="granted"){var notif=new Notification(data.title,data);if(notif.show){notif.show();}
if(data.timeout){setTimeout(function(){if(notif.close){notif.close();}
else if(notif.cancel){notif.cancel();}},data.timeout);}
return notif;}else if(level==="default"){Notification.requestPermission(function(){return WebNotifications.show(data);});}}
else if(window.webkitNotifications){if(!webkitNotifications.checkPermission()){var notif=webkitNotifications.createNotification(data.icon,data.title,data.body);notif.show();if(data.timeout){setTimeout(function(){if(notif.close){notif.close();}
else if(notif.cancel){notif.cancel();}},data.timeout);}
return notif;}else{webkitNotifications.requestPermission(function(){return WebNotifications.show(data);});}}},requestPermission:function(){if(window.webkitNotifications){if(!webkitNotifications.checkPermission()){}else{webkitNotifications.requestPermission(function(){});}}
else if(window.Notification){var level=Notification.permissionLevel?Notification.permissionLevel():Notification.permission;if(level==="default"){Notification.requestPermission(function(){});}}}};function humane_date(date_str){var time_formats=[[90,'a minute'],[3600,'minutes',60],[5400,'an hour'],[86400,'hours',3600],[129600,'a day'],[604800,'days',86400],[907200,'a week'],[2628000,'weeks',604800],[3942000,'a month'],[31536000,'months',2628000],[47304000,'a year'],[3153600000,'years',31536000]];var dt=new Date;var date=parseISO8601Date(date_str,{toLocal:true});var seconds=((dt-date)/1000);var token=' ago';var i=0;var format;if(seconds<0){seconds=Math.abs(seconds);token='';}
while(format=time_formats[i++]){if(seconds<format[0]){if(format.length==2){return format[1]+token;}else{return Math.round(seconds/format[2])+' '+format[1]+token;}}}
if(seconds>4730400000)
return Math.round(seconds/4730400000)+' centuries'+token;return date_str;};function humane_elapsed(firstDateStr,secondDateStr){var dt1=new Date(firstDateStr);var dt2=new Date(secondDateStr);var seconds=(dt2.getTime()-dt1.getTime())/1000;var numdays=Math.floor((seconds%31536000)/86400);var numhours=Math.floor(((seconds%31536000)%86400)/3600);var numminutes=Math.floor((((seconds%31536000)%86400)%3600)/60);var numseconds=Math.round((((seconds%31536000)%86400)%3600)%60);var elapsedStr='';elapsedStr+=numdays==1?numdays+' day ':'';elapsedStr+=numdays>1?numdays+' days ':'';elapsedStr+=numhours==1?numhours+' hour ':'';elapsedStr+=numhours>1?numhours+' hours ':'';elapsedStr+=numminutes==1?numminutes+' minute ':'';elapsedStr+=numminutes>1?numminutes+' minutes ':'';elapsedStr+=elapsedStr.length>0?'and ':'';elapsedStr+=numseconds==1?numseconds+' second':'';elapsedStr+=numseconds==0||numseconds>1?numseconds+' seconds':'';return elapsedStr;}
function getWindowUrl(win){return(win||window).location.href;}
function getWindowLocationSearch(win){var search=(win||window).location.search;if(!search){var index=window.location.href.indexOf('?');if(index!=-1){search=window.location.href.substring(index);}}
return search||'';}
function getParameterByName(name,url){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS,"i");var results=regex.exec(url||getWindowLocationSearch());if(results==null)
return"";else
return decodeURIComponent(results[1].replace(/\+/g," "));}
function replaceQueryString(url,param,value){var re=new RegExp("([?|&])"+param+"=.*?(&|$)","i");if(url.match(re))
return url.replace(re,'$1'+param+"="+value+'$2');else{if(url.indexOf('?')==-1){return url+'?'+param+"="+value;}
return url+'&'+param+"="+value;}}
function parseISO8601Date(s,options){options=options||{};var re=/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))?/;var d=s.match(re);if(!d){throw"Couldn't parse ISO 8601 date string '"+s+"'";}
var a=[1,2,3,4,5,6,10,11];for(var i in a){d[a[i]]=parseInt(d[a[i]],10);}
d[7]=parseFloat(d[7]);var ms=Date.UTC(d[1],d[2]-1,d[3],d[4],d[5],d[6]);if(d[7]>0){ms+=Math.round(d[7]*1000);}
if(d[8]!="Z"&&d[10]){var offset=d[10]*60*60*1000;if(d[11]){offset+=d[11]*60*1000;}
if(d[9]=="-"){ms-=offset;}else{ms+=offset;}}else if(!options.toLocal){ms+=new Date().getTimezoneOffset()*60000;}
return new Date(ms);}
(function($,window,undefined){function queryStringToObject(qstr){var result={},nvPairs=((qstr||"").replace(/^\?/,"").split(/&/)),i,pair,n,v;for(i=0;i<nvPairs.length;i++){var pstr=nvPairs[i];if(pstr){pair=pstr.split(/=/);n=pair[0];v=pair[1];if(result[n]===undefined){result[n]=v;}else{if(typeof result[n]!=="object"){result[n]=[result[n]];}
result[n].push(v);}}}
return result;}
$(document).bind("pagebeforechange",function(e,data){if(typeof data.toPage==="string"){var u=$.mobile.path.parseUrl(data.toPage);if($.mobile.path.isEmbeddedPage(u)){var u2=$.mobile.path.parseUrl(u.hash.replace(/^#/,""));if(u2.search){if(!data.options.dataUrl){data.options.dataUrl=data.toPage;}
data.options.pageData=queryStringToObject(u2.search);data.toPage=u.hrefNoHash+"#"+u2.pathname;}}}});})(jQuery,window);function ticks_to_human(str){var in_seconds=(str/10000000);var hours=Math.floor(in_seconds/3600);var minutes=Math.floor((in_seconds-(hours*3600))/60);var seconds='0'+Math.round(in_seconds-(hours*3600)-(minutes*60));var time='';if(hours>0)time+=hours+":";if(minutes<10&&hours==0)time+=minutes;else time+=('0'+minutes).substr(-2);time+=":"+seconds.substr(-2);return time;};(function(window){window.Globalize={translate:function(key){var val=window.localizationGlossary[key]||key;for(var i=1;i<arguments.length;i++){val=val.replace('{'+(i-1)+'}',arguments[i]);}
return val;}};})(window);(function(){var supportTouch=$.support.touch,scrollEvent="touchmove scroll",touchStartEvent=supportTouch?"touchstart":"mousedown",touchStopEvent=supportTouch?"touchend":"mouseup",touchMoveEvent=supportTouch?"touchmove":"mousemove";$.event.special.swipeupdown={setup:function(){var thisObject=this;var $this=$(thisObject);$this.bind(touchStartEvent,function(event){var data=event.originalEvent.touches?event.originalEvent.touches[0]:event,start={time:(new Date).getTime(),coords:[data.pageX,data.pageY],origin:$(event.target)},stop;function moveHandler(event){if(!start){return;}
var data=event.originalEvent.touches?event.originalEvent.touches[0]:event;stop={time:(new Date).getTime(),coords:[data.pageX,data.pageY]};if(Math.abs(start.coords[1]-stop.coords[1])>10){event.preventDefault();}}
$this.bind(touchMoveEvent,moveHandler).one(touchStopEvent,function(event){$this.unbind(touchMoveEvent,moveHandler);if(start&&stop){if(stop.time-start.time<1000&&Math.abs(start.coords[1]-stop.coords[1])>100&&Math.abs(start.coords[0]-stop.coords[0])<75){start.origin.trigger("swipeupdown").trigger(start.coords[1]>stop.coords[1]?"swipeup":"swipedown");}}
start=stop=undefined;});});}};$.each({swipedown:"swipeupdown",swipeup:"swipeupdown"},function(event,sourceEvent){$.event.special[event]={setup:function(){$(this).bind(sourceEvent,$.noop);}};});})();$.fn.visible=function(visible){if(visible){return this.removeClass('forceHide');}
return this.addClass('forceHide');};
/* imagefill v2.0.0 https://github.com/davesmiths/imagefill */(function(d){var g=d(),c=200,f,h="imagefill",e,b,a;e=function(){var o=d(this),n,q,x,i,A,k,E,s,j,m,C,l,p,y,w,t,B,v=0.61803398874985,D=0.38196601125015,z=h+"-halign",u=h+"-valign",r=h+"-align";B=o.parent();n=o;q=n.data(r)||"center/center";q=q.split("/");x=q[0];i=q[1]||"center";x=n.data(z)||x;i=n.data(u)||i;A=B.height()*1;k=B.width()*1;C=k/A;l=n.data("imagefill-image-ratio");if(C>l){p=true;y="100%";w="auto";s=k;E=k/l}else{p=false;y="auto";w="100%";s=A*l;E=A}n.css({width:y,height:w});j=A-E;m=k-s;t={position:"absolute",top:j/3+"px",left:m/3+"px",bottom:"auto",right:"auto",marginRight:"auto",marginBottom:"auto"};if(d.isNumeric(x)){x=x*1;if(p===false&&0<=x&&x<=100){if(x===100){t.left="auto";t.right=0}else{t.left=m*x/100+"px"}}}else{if(x==="third"){if(p===false){t.left=m/3+"px"}}else{if(x==="second-third"||x==="-third"){if(p===false){t.left=m*2/3+"px"}}else{if(x==="golden"){if(p===false){t.left=m*D+"px"}}else{if(x==="second-golden"||x==="-golden"){if(p===false){t.left=m*v+"px"}}else{if(x==="left"){t.left=0}else{if(x==="right"){t.left="auto";t.right=0}else{if(x==="middle"||x==="center"){if(p===false){t.left=m/2+"px"}}}}}}}}}if(d.isNumeric(i)){i=i*1;if(p&&0<=i&&i<=100){if(i===100){t.top="auto";t.bottom=0}else{t.top=j*i/100+"px"}}}else{if(i==="third"){if(p){t.top=j/3+"px"}}else{if(i==="-third"){if(p){t.top=j*2/3+"px"}}else{if(i==="golden"){if(p){t.top=j*D+"px"}}else{if(i==="-golden"){if(p){t.top=j*v+"px"}}else{if(i==="top"){t.top=0}else{if(i==="bottom"){t.top="auto";t.bottom=0}else{if(i==="middle"||i==="center"){if(p){t.top=j/2+"px"}}}}}}}}}n.css(t)};b=function(){var k=d(this),j,i;i="imagefill-wrapper ";i+=k.data("imagefill-class")||"";if(k.parent().is("."+i)===false){k.wrap('<div class="'+i+'"></div>')}j=k.parent();j.css({overflow:"hidden",position:"relative"});if(k.data("imagefill-image-ratio")===undefined){k.css({display:"block",position:"static"});k.data("imagefill-image-ratio",k.width()/k.height())}k.css({position:"absolute"});if(j.height()===0){j.css("minHeight",k.height()+"px")}e.call(this)};d.fn.imagefill=function(i){var k=d.extend({},i),j=d(this);j.data("imagefill-align",k.align);j.data("imagefill-halign",k.halign);j.data("imagefill-valign",k.valign);j.data("imagefill-class",k.className);if(k.delay!==undefined){c=k.delay}this.each(function(){g=g.add(this)});return this.each(function(){var m=d(this),n=m.attr("width"),l=m.attr("height");if(n===undefined||l===undefined){d(this).on("load",function(){b.call(this)})}else{m.data("imagefill-image-width",n);m.data("imagefill-image-height",l);b.call(this)}})};a=function(){clearTimeout(f);f=setTimeout(function(){g.each(e)},c)};d(window).on("resize",a)}(jQuery));
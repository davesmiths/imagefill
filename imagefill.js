/* imagefill v2.0.0 https://github.com/davesmiths/imagefill */(function(d){var g=d(),c=200,f,h="imagefill",e,b,a;e=function(){var o=d(this),n,q,x,i,A,k,E,s,j,m,C,l,p,y,w,t,B,v=0.61803398874985,D=0.38196601125015,z=h+"-halign",u=h+"-valign",r=h+"-align";B=o.parent();n=o;q=n.data(r)||"center/center";q=q.split("/");x=q[0];i=q[1]||"center";x=n.data(z)||x;i=n.data(u)||i;A=B.height()*1;k=B.width()*1;C=k/A;l=n.data("imagefill-image-ratio");if(C>l){p=true;y="100%";w="auto";s=k;E=k/l}else{p=false;y="auto";w="100%";s=A*l;E=A}n.css({width:y,height:w});j=A-E;m=k-s;t={position:"absolute",top:j/3+"px",left:m/3+"px",bottom:"auto",right:"auto",marginRight:"auto",marginBottom:"auto"};if(p){if(d.isNumeric(i)){i=i/100}else{if(i==="third"){i=1/3}else{if(i==="-third"){i=2/3}else{if(i==="golden"){i=D}else{if(i==="-golden"){i=v}else{if(i==="top"){i=0}else{if(i==="bottom"){i=1}else{if(i==="middle"||i==="center"){i=0.5}}}}}}}}if(0<=i&&i<=1){if(i===1){t.top="auto";t.bottom=0}else{t.top=j*i+"px"}}}else{if(d.isNumeric(x)){x=x/100}else{if(x==="third"){x=1/3}else{if(x==="-third"){x=2/3}else{if(x==="golden"){x=D}else{if(x==="-golden"){x=v}else{if(x==="left"){x=0}else{if(x==="right"){x=1}else{if(x==="middle"||x==="center"){x=0.5}}}}}}}}if(0<=x&&x<=1){if(x===1){t.left="auto";t.right=0}else{t.left=m*x+"px"}}}n.css(t)};b=function(){var k=d(this),j,i;i="imagefill-wrapper ";i+=k.data("imagefill-class")||"";if(k.parent().is("."+i)===false){k.wrap('<div class="'+i+'"></div>')}j=k.parent();j.css({overflow:"hidden",position:"relative"});if(k.data("imagefill-image-ratio")===undefined){k.css({display:"block",position:"static"});k.data("imagefill-image-ratio",k.width()/k.height())}k.css({position:"absolute"});if(j.height()===0){j.css("minHeight",k.height()+"px")}e.call(this)};d.fn.imagefill=function(i){var k=d.extend({},i),j=d(this);j.data("imagefill-align",k.align);j.data("imagefill-halign",k.halign);j.data("imagefill-valign",k.valign);j.data("imagefill-class",k.className);if(k.delay!==undefined){c=k.delay}this.each(function(){g=g.add(this)});return this.each(function(){var m=d(this),n=m.attr("width"),l=m.attr("height");if(n===undefined||l===undefined){d(this).on("load",function(){b.call(this)})}else{m.data("imagefill-image-width",n);m.data("imagefill-image-height",l);b.call(this)}})};a=function(){clearTimeout(f);f=setTimeout(function(){g.each(e)},c)};d(window).on("resize",a)}(jQuery));
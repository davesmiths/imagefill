/* imagefill v1.0.0 https://github.com/davesmiths/imagefill */(function(b){var d=b(),a=200;var c;run=function(){var i=b(this),m,t=false,h,q,e,s,f,x,j,w,g,o,n,v,l=0.61803398874985,y=0.38196601125015,p="imagefill-wrapper",u="imagefill",r="imagefill-halign",k="imagefill-valign";if(i.is("img")){t=true;m=h=i;if(h.parent().is("."+p)===false){h.wrap('<div class="'+p+'"></div>')}v=h.parent()}else{m=v=i;h=v.find("img").eq(0)}q=m.data(r)||"third";e=m.data(k)||"third";if(!m.data(u)){m.data(u,{width:m.width(),height:m.height()})}o=m.data(u).width;n=m.data(u).height;h.css({display:"block",position:"static",width:"auto",height:n+"px"});v.css({overflow:"hidden",position:"relative",height:n+"px"});s=v.height();f=v.width();x=h.height();j=h.width();w=f/s;g=j/x;if(w>g){ratio=true;width="100%";height="auto"}else{ratio=false;width="auto";height="100%"}h.css({width:width,height:height});v.css({height:x});s=v.height();f=v.width();x=h.height();j=h.width();css={position:"absolute",top:-1*x/3+"px",marginTop:s/3+"px",left:-1*j/3+"px",marginLeft:f/3+"px",bottom:"auto",right:"auto",marginRight:"auto",marginBottom:"auto"};if(q=="third"){if(ratio===false){css.left=-1*j/3+"px";css.marginLeft=1*f/3+"px"}}else{if(q=="second-third"){if(ratio===false){css.left=-2*j/3+"px";css.marginLeft=2*f/3+"px"}}else{if(q=="golden"){if(ratio===false){css.left=-1*y*j+"px";css.marginLeft=y*f+"px"}}else{if(q=="second-golden"){if(ratio===false){css.left=-1*l*j+"px";css.marginLeft=l*f+"px"}}else{if(q=="left"){css.left=0;css.marginLeft=0}else{if(q=="right"){css.left="auto";css.marginLeft="auto";css.right=0;css.marginRight=0}else{if(q=="middle"){if(ratio===false){css.left=-1*j/2+"px";css.marginLeft=1*f/2+"px"}}}}}}}}if(e=="third"){if(ratio){css.top=-1*x/3+"px";css.marginTop=s/3+"px"}}else{if(e=="second-third"){if(ratio){css.top=-2*x/3+"px";css.marginTop=2*s/3+"px"}}else{if(e=="golden"){if(ratio){css.top=-1*y*x+"px";css.marginTop=y*s+"px"}}else{if(e=="second-golden"){if(ratio){css.top=-1*l*x+"px";css.marginTop=l*s+"px"}}else{if(e=="top"){css.top=0;css.marginTop=0}else{if(e=="bottom"){css.top="auto";css.marginTop="auto";css.bottom=0;css.marginBottom=0}else{if(e=="middle"){if(ratio){css.top=-1*x/2+"px";css.marginTop=s/2+"px"}}}}}}}}h.css(css)};b.fn.imagefill=function(e){var f=b.extend({valign:"third",halign:"third"},e);if(e&&e.delay!==undefined){a=e.delay}this.each(function(){d=d.add(this)});return this.each(run)};runBuffer=function(){clearTimeout(c);c=setTimeout(function(){console.log(d.length);d.each(run)},a)};b(window).on("resize",runBuffer)}(jQuery));
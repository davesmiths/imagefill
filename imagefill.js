/* imagefill v2.1.0 https://github.com/davesmiths/imagefill */!function(i){"use strict";var t,a,e,l,o=i(),n=200,h="imagefill";a=function(){var t,a,e,l,o,n,d,s,g,r,c,m,u,f,p,v,w,y=i(this),b=.61803398874985,x=.38196601125015,N=h+"-halign",T=h+"-valign",j=h+"-align";w=y.parent(),t=y,a=t.data(j)||"center/center",a=a.split("/"),e=a[0],l=a[1]||"center",e=t.data(N)||e,l=t.data(T)||l,o=1*w.height(),n=1*w.width(),c=n/o,m=t.data("imagefill-image-ratio"),c>m?(u=!0,f="100%",p="auto",s=n,d=n/m):(u=!1,f="auto",p="100%",s=o*m,d=o),t.css({width:f,height:p}),g=o-d,r=n-s,v={position:"absolute",top:g/3+"px",left:r/3+"px",bottom:"auto",right:"auto",marginRight:"auto",marginBottom:"auto"},u?(i.isNumeric(l)?l/=100:"third"===l?l=1/3:"-third"===l?l=2/3:"golden"===l?l=x:"-golden"===l?l=b:"top"===l?l=0:"bottom"===l?l=1:("middle"===l||"center"===l)&&(l=.5),l>=0&&1>=l&&(1===l?(v.top="auto",v.bottom=0):v.top=g*l+"px")):(i.isNumeric(e)?e/=100:"third"===e?e=1/3:"-third"===e?e=2/3:"golden"===e?e=x:"-golden"===e?e=b:"left"===e?e=0:"right"===e?e=1:("middle"===e||"center"===e)&&(e=.5),e>=0&&1>=e&&(1===e?(v.left="auto",v.right=0):v.left=r*e+"px")),t.css(v)},e=function(){var t,e,l,o,n,h,d,s,g=i(this),r=g.is("video");e="imagefill-wrapper ",e+=g.data("imagefill-class")||"",s=g.height(),void 0===g.data("imagefill-image-ratio")&&(g.css({display:"block",position:"static",width:"auto",height:"auto"}),l=g.width(),o=g.height(),h=g.attr("height"),n=g.attr("width"),d=0===o||r&&300===l&&150===o?n/h:l/o,g.data("imagefill-image-ratio",d)),g.parent().is("."+e)===!1&&g.wrap('<div class="'+e+'"></div>'),t=g.parent(),t.css({overflow:"hidden",position:"relative"}),g[0].autoplay&&g[0].autoplay!==!1&&g[0].play(),g.css({position:"absolute"}),0===t.height()&&t.css("minHeight",s+"px"),a.call(this)},i.fn.imagefill=function(t){var a=i.extend({},t),l=i(this);return l.data("imagefill-align",a.align),l.data("imagefill-halign",a.halign),l.data("imagefill-valign",a.valign),l.data("imagefill-class",a.className),void 0!==a.delay&&(n=a.delay),this.each(function(){o=o.add(this)}),this.each(function(){var t=i(this),a=t.attr("width"),l=t.attr("height");void 0===a||void 0===l?i(this).on("load",function(){e.call(this)}):(t.data("imagefill-image-width",a),t.data("imagefill-image-height",l),e.call(this))})},l=function(){clearTimeout(t),t=setTimeout(function(){o.each(a)},n)},i(window).on("resize",l)}(jQuery);
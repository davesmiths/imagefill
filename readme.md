imagefill
=========

**A bit of artistic direction for images - A jQuery plugin to make images fill the available space and crop with a bit of artistic direction in responsive layouts**  
Created 2013 November 26

Usage
-----
Add a class to an image:
```
<img class="imagefill" src="path/to/image.jpg" width="400" height="200" alt="" />
```
Load jQuery and the plugin in some way, for example:
```
<script src="pathto/jquery.js"></script>
<script src="pathto/imagefill.js"></script>
```

Do the business:
```
$(function() {
    $('.imagefill').imagefill();
});
```
Play with some options

Options
-------

Options are applied via the markup with data attributes or JavaScript.  
*Markup wins if options are applied in JavaScript and markup*

Markup:
```
<img class="imagefill" data-imagefill-align="center/33" src="" width="400" height="200" alt="" />
```

JavaScript:
```
$(function() {
    $('.imagefill').imagefill({align:'third/50'});    
});
```

###valign
* top
* middle or center (default) - aligns the middle of the image with the middle of the wrapper div
* bottom
* third - aligns the first third of the image with the first third of the wrapper div
* -third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* -golden - aligns the reverse golden intersection at 0.3819... with the same point on the wrapper
* 0-100 - a percentage where 0 is equivalent to top and 100 is bottom

###halign
* left
* middle or center (default) - aligns the middle of the image with the middle of the wrapper div
* right
* third - aligns the first third of the image with the first third of the wrapper div
* -third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* -golden - aligns the reverse golden intersection at 0.3819... with the same point on the wrapper
* 0-100 - a percentage where 0 is equivalent to left and 100 is right

###align
* halign/valign - a more compact way of applying halign and valign

How it works
------------
Imagefill makes an image fill the available horizontal space and crops appropriately through assignable presets.

It does this by making sure there is a wrapper div around the image. The wrapper div makes it possible for imagefill to apply styles that position and crop the image.

A window.resize event is handled that updates all imagefill images in a regulated and sensible way.


Advanced
--------

###Get a bit responsive and control the image height
CSS
```
.imagefill-wrapper {min-height:200px;}
@media all and (min-width:700px) {
    .imagefill-wrapper {min-height:400px;}
}
```


    
###Custom class option
The wrapper div gets both the standard class of imagefill-wrapper and the custom class given

Markup
```
<img class="imagefill" data-imagefill-class="wop" src="" width="400" height="200" alt="" />
```

JavaScript
```
$('.imagefill').imagefill({className:'wop'});
```

###Delay option
Change the window.resize event throttle from the default 200 ms to a setting of your choosing:
```
$(function() {
    $('.imagefill').imagefill({delay: 100});
});
```

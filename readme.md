imagefill
=========

**jQuery plugin to get images to fill the space and crop with artistic direction in responsive layouts**  
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
    $('.imagefill').imagefill({align:'center/33'});    
});
```

###valign
* top
* middle or center (default) - aligns the middle of the image with the middle of the wrapper div
* bottom
* third - aligns the first third of the image with the first third of the wrapper div
* second-third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper
* 0-100 - a percentage where 0 is equivalent to top and 100 is bottom

###halign
* left
* middle or center (default) - aligns the middle of the image with the middle of the wrapper div
* right
* third - aligns the first third of the image with the first third of the wrapper div
* second-third or -third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden or -golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper
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

    
###Apply options via JavaScript
These will override any set with data attributes
```
$('.imagefill').imagefill({valign:'top', halign:'left'});
$('.imagefill').imagefill({align:'0/70'}); // equivalent to {halign:'left',valign:'70'}
```

###Delay option
Change the window.resize event throttle from the default 200 ms to a setting of your choosing:
```
$(function() {
    $('.imagefill').imagefill({delay: 100});
});
```
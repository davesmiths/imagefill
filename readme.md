imagefill
=========

**A jQuery plugin to help maintain artistic direction over images in responsive layouts**  
Created 2013 November 26

Usage
-----
Add a class to an image:
```
<img class="imagefill" src="path/to/image.jpg" alt="" />
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
<img class="imagefill" data-imagefill-valign="golden" src="" alt="" />
```

JavaScript:
```
$(function() {
    $('.imagefill').imagefill({valign:'top', halign:'left'});
});
```

###valign
* top
* middle - aligns the middle of the image with the middle of the wrapper div
* bottom
* third (default) - aligns the first third of the image with the first third of the wrapper div
* second-third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper

###halign
* left
* middle - aligns the middle of the image with the middle of the wrapper div
* right
* third (default) - aligns the first third of the image with the first third of the wrapper div
* second-third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper


How it works
------------
Imagefill makes an image fill the available horizontal space and crops appropriately through assignable presets.

It does this by making sure there is a wrapper div around the image. The wrapper div makes it possible to apply styles that position and crop the image.

A window.resize event is handled that updates all imagefill images in a regulated and sensible way.


Advanced
--------

###Delay option
Change the window.resize event throttle from the default 200 ms to a setting of your choosing:
```
$(function() {
    $('.imagefill').imagefill({delay: 100});
});
```

###Alternate markup
If you need full control and want to wrap the image in your own div then this is possible too:
```
<div class="imagefill">
    <img src="path/to/image.jpg" alt="" />
</div>
```

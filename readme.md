imagefill
=========

**A jQuery plugin to help manage images in responsive layouts**

Images fill the available horizontal space and crop appropriately through assignable presets.

The window.resize event updates all images run through imagefill in a regulated and sensible way.

Usage
-----

1. Wrap your image in an imagefill div:
```
<div class="imagefill">
    <img src="path/to/image.jpg" alt="" />
</div>
```
or add the imagefill class to the image directly - note a wrapper div is dynamically added (div.imagefill-wrapper):
```
<img class="imagefill" src="path/to/image.jpg" alt="" />
```

2. Make sure the page loads the plugin

3. Run imagefill:
```
$(function() {
    $('.imagefill').imagefill();
});
```

Options
-------

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

Apply options in two ways

Markup:
```
<div class="imagefill" data-imagefill-valign="golden">
```

JavaScript:
```
$(function() {
    $('.imagefill').imagefill({valign:'top', halign:'left'});
});
```

Advanced Options
----------------

###delay
Change the window.resize event throttle from the default 200 ms to a setting of your choosing:
```
$(function() {
    $('.imagefill').imagefill({delay: 100});
});
```

div or img.imagefill
------------------------------

When writing imagefill I imagined there might be the odd occasion when a dynamically added div could cause a 
headache for someone when styling because it isn't explicitly in the markup. So the choice is there and both work.


imagefill
=========

**A jQuery plugin to help manage images in responsive layouts**

Images fill the available horizontal space and crop appropriately through assignable presets

The window.resize event is bound to and updates all images called through imagefill in a regulated and sensible way

Usage
-----

1. Wrap your image in an imagefill div
```
<div class="imagefill">
<img src="path/to/image.jpg" alt="" />
</div>
```
or alternatively forget the div and add the imagefill class to the image - the wrapper div is dynamically added
```
<img class="imagefill" src="path/to/image.jpg" alt="" />
```


2. Make sure the page is loading the plugin

3. Run imagefill, 
```
$(function() {
    $('.imagefill').imagefill();
});
```

Options
-------

valign:
* top
* middle - aligns the middle of the image with the middle of the wrapper div
* bottom
* third (default) - aligns the first third of the image with the first third of the wrapper div
* second-third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper

halign:
* left
* middle - aligns the middle of the image with the middle of the wrapper div
* right
* third (default) - aligns the first third of the image with the first third of the wrapper div
* second-third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* second-golden - aligns the second golden intersection at 0.3819... with the same point on the wrapper

Options are applied in two ways

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


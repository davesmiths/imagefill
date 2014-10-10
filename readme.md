imagefill
=========

**A bit of artistic direction for images - A jQuery plugin to make images (and videos) fill the available space and crop with a bit of artistic direction in responsive layouts**  



Usage
-----
```
<img data-imagefill src="path/to/image.jpg" width="400" height="200" alt="" />

<script src="pathto/jquery.js"></script>
<script src="pathto/imagefill.js"></script>
<script>
$(function() {
    $('[data-imagefill]').imagefill();
});
</script>
```




More interesting stuff
----------------------

```
<img data-imagefill="center/33" src="" width="400" height="200" alt="" />
```
When the image is cropped this will keep focus to the horizontal center and vertical 33%. This works like CSS background positions; the vertical 33% of the image aligns with the vertical 33% of the crop.

With JavaScript:
```
$(function() {
    $('.thing').imagefill({align:'third/50'});    
});
```

Note that markup wins if the options are applied in JavaScript and markup



Options
-------

###valign
* top
* center (default) - aligns the image and wrapper centers
* bottom
* third - aligns the first third of the image with the first third of the wrapper div
* -third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* -golden - aligns the reverse golden intersection at 0.3819... with the same point on the wrapper
* 0-100 - a percentage where 0 is equivalent to top and 100 is bottom - aligns the vertical n% of the image and wrapper

###halign
* left
* center (default) - aligns the image and wrapper centers
* right
* third - aligns the first third of the image with the first third of the wrapper div
* -third - aligns the second third of the image with the second third of the wrapper div
* golden - aligns the first golden intersection at 0.6180... with the same point on the wrapper
* -golden - aligns the reverse golden intersection at 0.3819... with the same point on the wrapper
* 0-100 - a percentage where 0 is equivalent to left and 100 is right - aligns the horizontal n% of the image and wrapper

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

    
###Custom wrapper class
The wrapper div gets a standard class of imagefill-wrapper. The following adds an extra custom class of "wop" to the wrapper

Markup
```
<img data-imagefill data-imagefill-class="wop" src="" width="400" height="200" alt="" />
```

JavaScript
```
$('.thing').imagefill({className:'wop'});
```

Created 2013 November 26

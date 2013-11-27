imagefill
=========

**A jQuery plugin to help manage images in responsive layouts**

Images fill the available horizontal space and crop appropriately through assignable presets

The window.resize event is bound to and updates all images called through imagefill in a regulated and sensible way

Usage
-----

Wrap your image in an imagefill div
```
<div class="imagefill">
<img src="path/to/image.jpg" alt="" />
</div>
```

Run imagefill
```
$(function() {
    $('.imagefill').imagefill();
});
```
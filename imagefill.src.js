// imagefill v1.0.0
// A jQuery plugin to help manage images in responsive layouts
// Images fill the available horizontal space and crop appropriately through assignable presets
// imagefill binds to a window.resize event and updates all images called through imagefill in a regulated and sensible way
// by Dave Smith 2013 November 26
(function($) {
	
	// $collection, to collect all the elements that can passed into imagefill so they can be updated on window.resize efficiently
	var $collection = $()
		
		// Delay, on window resize the delay regulates the calls to the main function to prevent potential overload and unnecessary calls
		,delay = 200
		
		// tid is the timerid used to clear timeout in the window resize event
		var tid
		
	;
	
	// The main function
	run = function() {
		
		var $image = $(this)
			,horizontalPreset
			,verticalPreset
			,wrapperHeight
			,wrapperWidth
			,imageHeight
			,imageWidth
			,wrapperRatio
			,imageRatio
			,origWidth
			,origHeight
			,$wrapper
			,goldenRatioInv = 0.61803398874985
			,goldenRatioInvLeft = 0.38196601125015
			,imagefillWrapperClass = 'imagefill-wrapper'
			,imagefillDataName = 'imagefill'
			,imagefillDataHalign= 'imagefill-halign'
			,imagefillDataValign = 'imagefill-valign'
		;
					
		horizontalPreset = $image.data(imagefillDataHalign) || 'third';
		verticalPreset = $image.data(imagefillDataValign) || 'third';
		
		// Wrap image if necessary
		if ($image.parent().is('.' + imagefillWrapperClass) === false) {
			$image.wrap('<div class="' + imagefillWrapperClass + '"></div>');
		}
		
		if (!$image.data(imagefillDataName)) {
			$image.data(imagefillDataName, {
				width: $image.width()
				,height: $image.height()
			});
		}
		
		origWidth = $image.data(imagefillDataName).width;
		origHeight = $image.data(imagefillDataName).height;
		
		$image.css({
			display: 'block'
			,position: 'static'
			,width: origWidth + 'px'
			,height: origHeight + 'px'
		});
		
		$wrapper = $image.parent();
		
		$wrapper.css({
			overflow:'hidden'
			,position:'relative'
			,height: origHeight + 'px'
		});
		
		wrapperHeight = $wrapper.height();
		wrapperWidth = $wrapper.width();
		imageHeight = $image.height();
		imageWidth = $image.width();
		
		wrapperRatio = wrapperWidth / wrapperHeight;
		imageRatio = imageWidth / imageHeight;
		
		if (wrapperRatio > imageRatio) {
			ratio = true;
			width = '100%';
			height = 'auto';
		}
		else {
			ratio = false;
			width = 'auto';
			height = '100%';
		}
		$image.css({
			width: width
			,height: height
		});
		$wrapper.css({
			height: imageHeight
		});
		// Decided that by default the original height of the image is used to crop the image no matter the width
		
		// Default to valign third and halign third
		css = {
			position: 'absolute'
			,top: -1 * $image.height() / 3 + 'px'
			,marginTop: $wrapper.height() / 3 + 'px'
			,left: -1 * $image.width() / 3 + 'px'
			,marginLeft: $wrapper.width() / 3 + 'px'
			,bottom: 'auto'
			,right: 'auto'
			,marginRight: 'auto'
			,marginBottom: 'auto'
		};
		
		// Horizontal Presets
		if (horizontalPreset == 'third') {
			if (ratio === false) {
				css.left = -1 * $image.width() / 3 + 'px';
				css.marginLeft = 1 * $wrapper.width() / 3 + 'px';
			}
		}
		else if (horizontalPreset == 'second-third') {
			if (ratio === false) {
				css.left = -2 * $image.width() / 3 + 'px';
				css.marginLeft = 2 * $wrapper.width() / 3 + 'px';
			}
		}
		else if (horizontalPreset == 'golden') {
			if (ratio === false) {
				css.left = -1 * goldenRatioInvLeft * $image.width() + 'px';
				css.marginLeft = goldenRatioInvLeft * $wrapper.width() + 'px';
			}
		}
		else if (horizontalPreset == 'second-golden') {
			if (ratio === false) {
				css.left = -1 * goldenRatioInv * $image.width() + 'px';
				css.marginLeft = goldenRatioInv * $wrapper.width() + 'px';
			}
		}
		else if (horizontalPreset == 'left') {
			css.left = 0;
			css.marginLeft = 0;
		}
		else if (horizontalPreset == 'right') {
			css.left = 'auto';
			css.marginLeft = 'auto';
			css.right = 0;
			css.marginRight = 0;
		}
		else if (horizontalPreset == 'middle') {
			if (ratio === false) {
				css.left = -1 * $image.width() / 2 + 'px';
				css.marginLeft = 1 * $wrapper.width() / 2 + 'px';
			}
		}
		
		// Vertical Presets
		if (verticalPreset == 'third') {
			if (ratio) {
				css.top = -1 * $image.height() / 3 + 'px';
				css.marginTop = $wrapper.height() / 3 + 'px';
			}
		}
		else if (verticalPreset == 'second-third') {
			if (ratio) {
				css.top = -2 * $image.height() / 3 + 'px';
				css.marginTop = 2 * $wrapper.height() / 3 + 'px';
			}
		}
		else if (verticalPreset == 'golden') {
			if (ratio) {
				css.top = -1 * goldenRatioInvLeft * $image.height() + 'px';
				css.marginTop = goldenRatioInvLeft * $wrapper.height() + 'px';
			}
		}
		else if (verticalPreset == 'second-golden') {
			if (ratio) {
				css.top = -1 * goldenRatioInv * $image.height() + 'px';
				css.marginTop = goldenRatioInv * $wrapper.height() + 'px';
			}
		}
		else if (verticalPreset == 'top') {
			css.top = 0;
			css.marginTop = 0;
		}
		else if (verticalPreset == 'bottom') {
			css.top = 'auto';
			css.marginTop = 'auto';
			css.bottom = 0;
			css.marginBottom = 0;
		}
		else if (verticalPreset == 'middle') {
			if (ratio) {
				css.top = -1 * $image.height() / 2 + 'px';
				css.marginTop = $wrapper.height() / 2 + 'px';
			}
		}
		
		$image.css(css);
	};
	
	$.fn.imagefill = function(options) {
		
		var o = $.extend(
				{
					valign: 'third'
					,halign: 'third'
				}
				,options
			)
		;
		
		if (options && options.delay !== undefined) {
			delay = options.delay;
		}
		
		this.each(function() {
			$collection = $collection.add(this);
		});
		
		return this.each(run);
		
	};
	
	// Prevent unnecessary calls to run
	runBuffer = function() {
		clearTimeout(tid);
		tid = setTimeout(function() {
			console.log($collection.length);
			$collection.each(run);
		}, delay);
	};
	
	$(window).on('resize', runBuffer);
	
	
}(jQuery));

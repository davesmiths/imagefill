/* imagefill v1.0.1 https://github.com/davesmiths/imagefill */
(function($) {
	
	// $collection, to collect all the elements that can passed into imagefill so they can be updated on window.resize efficiently
	var $collection = $()
		
		// Delay, on window resize the delay regulates the calls to the main function to prevent potential overload and unnecessary calls
		,delay = 200
		
		// tid is the timerid used to clear timeout in the window resize event
		,tid
		
		,imagefillDataName = 'imagefill'
		
	;
	
	// The main function
	run = function() {

		var $this = $(this)
			,$image
			,alignPreset
			,horizontalPreset
			,verticalPreset
			,wrapperHeight
			,wrapperWidth
			,imageHeight
			,imageWidth
			,heightDifference
			,widthDifference
			,wrapperRatio
			,imageRatio
			,origHeight
			,$wrapper
			,goldenRatioInv = 0.61803398874985
			,goldenRatioInvLeft = 0.38196601125015
			,imagefillDataHalign= 'imagefill-halign'
			,imagefillDataValign = 'imagefill-valign'
			,imagefillDataAlign = 'imagefill-align'
		;
		
		$wrapper = $this.parent();
		$image = $this;
		
		// Here in case the preset changes at any point
		alignPreset = $image.data(imagefillDataAlign) || 'center/center';
		alignPreset = alignPreset.split('/');
		horizontalPreset = alignPreset[0];
		verticalPreset = alignPreset[1] || 'center';
		horizontalPreset = $image.data(imagefillDataHalign) || horizontalPreset;
		verticalPreset = $image.data(imagefillDataValign) || verticalPreset;
		
		
		wrapperHeight = $wrapper.height() * 1;
		wrapperWidth = $wrapper.width() * 1;
		imageHeight = $image.data('imagefill-image-height') * 1;
		imageWidth = $image.data('imagefill-image-width') * 1;
		
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
		
		imageHeight = $image.height() * 1;
		imageWidth = $image.width() * 1;
		
		heightDifference = wrapperHeight - imageHeight;
		widthDifference = wrapperWidth - imageWidth;
		
		// Default to valign third and halign third
		css = {
			position: 'absolute'
			,top: heightDifference / 3 + 'px'
			,left: widthDifference / 3 + 'px'
			,bottom: 'auto'
			,right: 'auto'
			,marginRight: 'auto'
			,marginBottom: 'auto'
		};
		
		// Horizontal Presets
		if ($.isNumeric(horizontalPreset)) {
    		horizontalPreset = horizontalPreset * 1;
			if (ratio === false && 0 <= horizontalPreset && horizontalPreset <= 100) {
			    if (horizontalPreset === 100) {
        			css.left = 'auto';
        			css.right = 0;
			    }
			    else {
    				css.left = widthDifference * horizontalPreset / 100 + 'px';
			    }
			}
		}
		else if (horizontalPreset == 'third') {
			if (ratio === false) {
				css.left = widthDifference / 3 + 'px';
			}
		}
		else if (horizontalPreset == 'second-third') {
			if (ratio === false) {
				css.left = widthDifference * 2 / 3 + 'px';
			}
		}
		else if (horizontalPreset == 'golden') {
			if (ratio === false) {
				css.left = widthDifference * goldenRatioInvLeft + 'px';
			}
		}
		else if (horizontalPreset == 'second-golden') {
			if (ratio === false) {
				css.left = widthDifference * goldenRatioInv + 'px';
			}
		}
		else if (horizontalPreset == 'left') {
			css.left = 0;
		}
		else if (horizontalPreset == 'right') {
			css.left = 'auto';
			css.right = 0;
		}
		else if (horizontalPreset == 'middle' || horizontalPreset == 'center') {
			if (ratio === false) {
				css.left = widthDifference / 2 + 'px';
			}
		}
		
		// Vertical Presets
		if ($.isNumeric(verticalPreset)) {
		    verticalPreset = verticalPreset * 1;
			if (ratio && 0 <= verticalPreset && verticalPreset <= 100) {
			    if (verticalPreset === 100) {
    				css.top = 'auto';
    				css.bottom = 0;
			    }
			    else {
    				css.top = heightDifference * verticalPreset / 100 + 'px';
			    }
			}
		}
		else if (verticalPreset == 'third') {
			if (ratio) {
				css.top = heightDifference / 3 + 'px';
			}
		}
		else if (verticalPreset == 'second-third') {
			if (ratio) {
				css.top = heightDifference * 2 / 3 + 'px';
			}
		}
		else if (verticalPreset == 'golden') {
			if (ratio) {
				css.top = heightDifference * goldenRatioInvLeft + 'px';
			}
		}
		else if (verticalPreset == 'second-golden') {
			if (ratio) {
				css.top = heightDifference * goldenRatioInv + 'px';
			}
		}
		else if (verticalPreset == 'top') {
			css.top = 0;
		}
		else if (verticalPreset == 'bottom') {
			css.top = 'auto';
			css.bottom = 0;
		}
		else if (verticalPreset == 'middle' || verticalPreset == 'center') {
			if (ratio) {
				css.top = heightDifference / 2 + 'px';
			}
		}
		
		$image.css(css);
		
	};
	
	runonce = function() {
		
		var $this = $(this)
			,$wrapper
			,imagefillWrapperClass
		;
		
		imagefillWrapperClass = 'imagefill-wrapper ';
		imagefillWrapperClass += $this.data('imagefill-class') || '';
		
		// Wrap image if necessary
		if ($this.parent().is('.' + imagefillWrapperClass) === false) {
			$this.wrap('<div class="' + imagefillWrapperClass + '"></div>');
		}
		$wrapper = $this.parent();
		$wrapper.css({
			overflow:'hidden'
			,position:'relative'
		});
		
		// Get the image width and height
		if ($this.data('imagefill-image-width') === undefined) {
			$this.css({
				display: 'block'
				,position: 'static'
			});
			$this.data('imagefill-image-width', $this.width());
			$this.data('imagefill-image-height', $this.height());
		}
		// Make position absolute in order to not upset the first wrapper width and height call in run()
		$this.css({position:'absolute'});
		
		// If the wrapper has no height use the height of the image
		if ($wrapper.height() === 0) {
    		$wrapper.css('minHeight', $this.data('imagefill-image-height'));
		}
		
		run.call(this);
	};
	
	$.fn.imagefill = function(options) {

		var o = $.extend(
				{}
				,options
			)
			,$this = $(this)
		;
		$this.data('imagefill-align', o.align);
		$this.data('imagefill-halign', o.halign);
		$this.data('imagefill-valign', o.valign);
		$this.data('imagefill-class', o.className);
		
		if (o.delay !== undefined) {
			delay = o.delay;
		}
		
		this.each(function() {
			$collection = $collection.add(this);
		});

		return this.each(function() {
			var $this = $(this)
				,width = $this.attr('width')
				,height = $this.attr('height')
			;
			
			// Optimised to call run when the width and height attributes are set, rather than wait for the image to load
			if (width === undefined || height === undefined) {
				$(this).on('load', function() {
					runonce.call(this);
				});
			}
			else {
				$this.data('imagefill-image-width', width);
				$this.data('imagefill-image-height', height);
				runonce.call(this);
			}
			// There may be caveats
			// http://stackoverflow.com/questions/10403983/cross-browser-image-onload-event-handling
		});
		
	};
	
	// Prevent unnecessary calls to run
	runBuffer = function() {
		clearTimeout(tid);
		tid = setTimeout(function() {
			$collection.each(run);
		}, delay);
	};
	
	$(window).on('resize', runBuffer);
	
	
}(jQuery));
/* imagefill v2.0.0 https://github.com/davesmiths/imagefill */
(function($) {
	
	'use strict';
	
	// $collection, to collect all the elements that can passed into imagefill so they can be updated on window.resize efficiently
	var $collection = $()
		
		// Delay, on window resize the delay regulates the calls to the main function to prevent potential overload and unnecessary calls
		,delay = 200
		
		// tid is the timerid used to clear timeout in the window resize event
		,tid
		
		,imagefillDataName = 'imagefill'
		
		,run
		,runonce
		,runBuffer
		
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
			,ratio
			,width
			,height
			,css
			,$wrapper
			,goldenRatioInv = 0.61803398874985
			,goldenRatioInvLeft = 0.38196601125015
			,imagefillDataHalign= imagefillDataName + '-halign'
			,imagefillDataValign = imagefillDataName + '-valign'
			,imagefillDataAlign = imagefillDataName + '-align'
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
		
		wrapperRatio = wrapperWidth / wrapperHeight;
		imageRatio = $image.data('imagefill-image-ratio');

//console.log('imageHeight:',imageHeight, 'imageWidth:', imageWidth);

		if (wrapperRatio > imageRatio) {
			ratio = true;
			width = '100%';
			height = 'auto';
			imageWidth = wrapperWidth;
			imageHeight = wrapperWidth / imageRatio;
		}
		else {
			ratio = false;
			width = 'auto';
			height = '100%';
			imageWidth = wrapperHeight * imageRatio;
			imageHeight = wrapperHeight;
		}
		
		$image.css({
			width: width
			,height: height
		});
		
		heightDifference = wrapperHeight - imageHeight;
		widthDifference = wrapperWidth - imageWidth;

//console.log('valign:',verticalPreset, 'halign:', horizontalPreset);
//console.log('wrapperHeight:',wrapperHeight, 'wrapperWidth:', wrapperWidth);
//console.log('imageHeight:',imageHeight, 'imageWidth:', imageWidth);
//console.log('wrapperRatio > imageRatio', wrapperRatio > imageRatio);
		
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
		
			
		// Vertical Presets
		if (ratio) {
			
			if ($.isNumeric(verticalPreset)) {
				verticalPreset = verticalPreset / 100;
			}
			else if (verticalPreset === 'third') {
				verticalPreset = 1/3;
			}
			else if (verticalPreset === '-third') {
				verticalPreset = 2/3;
			}
			else if (verticalPreset === 'golden') {
				verticalPreset = goldenRatioInvLeft;
			}
			else if (verticalPreset === '-golden') {
				verticalPreset = goldenRatioInv;
			}
			else if (verticalPreset === 'top') {
				verticalPreset = 0;
			}
			else if (verticalPreset === 'bottom') {
				verticalPreset = 1;
			}
			else if (verticalPreset === 'middle' || verticalPreset === 'center') {
				verticalPreset = 0.5;
			}
			
			if (0 <= verticalPreset && verticalPreset <= 1) {
				if (verticalPreset === 1) {
					css.top = 'auto';
					css.bottom = 0;
				}
				else {
					css.top = heightDifference * verticalPreset + 'px';
				}
			}
			
		}
		
		// Horizontal Presets
		else {
			
			if ($.isNumeric(horizontalPreset)) {
				horizontalPreset = horizontalPreset / 100;
			}
			else if (horizontalPreset === 'third') {
				horizontalPreset = 1/3;
			}
			else if (horizontalPreset === '-third') {
				horizontalPreset = 2/3;
			}
			else if (horizontalPreset === 'golden') {
				horizontalPreset = goldenRatioInvLeft;
			}
			else if (horizontalPreset === '-golden') {
				horizontalPreset = goldenRatioInv;
			}
			else if (horizontalPreset === 'left') {
				horizontalPreset = 0;
			}
			else if (horizontalPreset === 'right') {
				horizontalPreset = 1;
			}
			else if (horizontalPreset === 'middle' || horizontalPreset === 'center') {
				horizontalPreset = 0.5;
			}
			
			if (0 <= horizontalPreset && horizontalPreset <= 1) {
				if (horizontalPreset === 1) {
					css.left = 'auto';
					css.right = 0;
				}
				else {
					css.left = widthDifference * horizontalPreset + 'px';
				}
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
		if ($this.data('imagefill-image-ratio') === undefined) {
			$this.css({
				display: 'block'
				,position: 'static'
			});
			$this.data('imagefill-image-ratio', $this.width() / $this.height());
		}
		// Make position absolute in order to not upset the first wrapper width and height call in run()
		$this.css({position:'absolute'});
		
		// If the wrapper has no (min-)height use the height of the image
		if ($wrapper.height() === 0) {
    		$wrapper.css('minHeight', $this.height() + 'px');
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
		
			var $img = $(this)
				,width = $img.attr('width')
				,height = $img.attr('height')
			;
			
			// Optimised to call run when the width and height attributes are set, rather than wait for the image to load
			if (width === undefined || height === undefined) {
				$(this).on('load', function() {
					runonce.call(this);
				});
			}
			else {
				$img.data('imagefill-image-width', width);
				$img.data('imagefill-image-height', height);
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
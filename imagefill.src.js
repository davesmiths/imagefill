/* imagefill v2.2.1 https://github.com/davesmiths/imagefill */
(function($) {

	'use strict';

	// $collection, to collect all the elements that can passed into imagefill so they can be updated on window.resize efficiently
	var $collection = $(),

	// Delay, on window resize the delay regulates the calls to the main function to prevent potential overload and unnecessary calls
	delay = 200,

	// tid is the timerid used to clear timeout in the window resize event
	tid,

	imagefill_str = 'imagefill',
	third_str = 'third',
	neg_third_str = '-' + third_str,
	golden_str = 'golden',
	neg_golden_str = '-' + golden_str,
	center_str = 'center',
	auto_str = 'auto',
	goldenRatioInv = 0.61803398874985,
	goldenRatioInvLeft = 0.38196601125015,
	imagefill_align_str = imagefill_str + '-align',
	imagefill_halign_str = imagefill_str + '-halign',
	imagefill_valign_str = imagefill_str + '-valign',
	imagefill_class_str = imagefill_str + '-class',
	imagefill_image_ratio_str = imagefill_str + '-image-ratio',

	run,
	runonce,
	runBuffer;

	// The main function
	run = function() {

		var $this = $(this),
		$image,
		alignPreset,
		horizontalPreset,
		verticalPreset,
		wrapperHeight,
		wrapperWidth,
		imageHeight,
		imageWidth,
		heightDifference,
		widthDifference,
		wrapperRatio,
		imageRatio,
		ratio,
		width,
		height,
		css,
		$wrapper;

		$wrapper = $this.parent();
		$image = $this;

		// Here in case the preset changes at any point
		alignPreset = $image.data(imagefill_align_str) || $image.data(imagefill_str) || center_str + '/' + center_str;
		alignPreset = alignPreset.split('/');
		horizontalPreset = alignPreset[0];
		verticalPreset = alignPreset[1] || center_str;
		horizontalPreset = $image.data(imagefill_halign_str) || horizontalPreset;
		verticalPreset = $image.data(imagefill_valign_str) || verticalPreset;
		//console.log(horizontalPreset, verticalPreset);

		wrapperHeight = $wrapper.height() * 1;
		wrapperWidth = $wrapper.width() * 1;

		wrapperRatio = wrapperWidth / wrapperHeight;
		imageRatio = $image.data(imagefill_image_ratio_str);

		//console.log('imageHeight:',imageHeight, 'imageWidth:', imageWidth);

		if (wrapperRatio > imageRatio) {
			ratio = true;
			width = '100%';
			height = auto_str;
			imageWidth = wrapperWidth;
			imageHeight = wrapperWidth / imageRatio;
		}
		else {
			ratio = false;
			width = auto_str;
			height = '100%';
			imageWidth = wrapperHeight * imageRatio;
			imageHeight = wrapperHeight;
		}

		$image.css({
			width: width,
			height: height
		});

		heightDifference = wrapperHeight - imageHeight;
		widthDifference = wrapperWidth - imageWidth;

		//console.log('valign:',verticalPreset, 'halign:', horizontalPreset);
		//console.log('wrapperHeight:',wrapperHeight, 'wrapperWidth:', wrapperWidth);
		//console.log('imageHeight:',imageHeight, 'imageWidth:', imageWidth);
		//console.log('wrapperRatio > imageRatio', wrapperRatio > imageRatio);

		// Default to valign third and halign third
		css = {
			position: 'absolute',
			top: heightDifference / 3 + 'px',
			left: widthDifference / 3 + 'px',
			bottom: auto_str,
			right: auto_str,
			marginRight: auto_str,
			marginBottom: auto_str
		};


		// Vertical Presets
		if (ratio) {

			if ($.isNumeric(verticalPreset)) {
				verticalPreset = verticalPreset / 100;
			}
			else if (verticalPreset === third_str) {
				verticalPreset = 1/3;
			}
			else if (verticalPreset === neg_third_str) {
				verticalPreset = 2/3;
			}
			else if (verticalPreset === golden_str) {
				verticalPreset = goldenRatioInvLeft;
			}
			else if (verticalPreset === neg_golden_str) {
				verticalPreset = goldenRatioInv;
			}
			else if (verticalPreset === 'top') {
				verticalPreset = 0;
			}
			else if (verticalPreset === 'bottom') {
				verticalPreset = 1;
			}
			else if (verticalPreset === center_str) {
				verticalPreset = 0.5;
			}

			if (0 <= verticalPreset && verticalPreset <= 1) {
				if (verticalPreset === 1) {
					css.top = auto_str;
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
			else if (horizontalPreset === third_str) {
				horizontalPreset = 1/3;
			}
			else if (horizontalPreset === neg_third_str) {
				horizontalPreset = 2/3;
			}
			else if (horizontalPreset === golden_str) {
				horizontalPreset = goldenRatioInvLeft;
			}
			else if (horizontalPreset === neg_golden_str) {
				horizontalPreset = goldenRatioInv;
			}
			else if (horizontalPreset === 'left') {
				horizontalPreset = 0;
			}
			else if (horizontalPreset === 'right') {
				horizontalPreset = 1;
			}
			else if (horizontalPreset === center_str) {
				horizontalPreset = 0.5;
			}

			if (0 <= horizontalPreset && horizontalPreset <= 1) {
				if (horizontalPreset === 1) {
					css.left = auto_str;
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

		var $this = $(this),
		isVideo = $this.is('video'),
		$wrapper,
		imagefillWrapperClass,
		thisWidth,
		thisHeight,
		thisAttrWidth,
		thisAttrHeight,
		ratio,
		currentlyViewedHeight;

		currentlyViewedHeight = $this.height();

		// Get the image width and height
		if ($this.data(imagefill_image_ratio_str) === undefined) {

			$this.css({
				display: 'block',
				position: 'static',
				width: auto_str,
				height: auto_str
			});

			thisWidth = $this.width();
			thisHeight = $this.height();

			// Fallback to use element attributes
			thisAttrHeight = $this.attr('height');
			thisAttrWidth = $this.attr('width');

			if (thisHeight === 0 || (isVideo && thisWidth === 300 && thisHeight === 150)) { // 300 x 150 is a default width and height for the video element
				ratio = thisAttrWidth / thisAttrHeight;
			}
			else {
				ratio = thisWidth / thisHeight;
			}

			$this.data(imagefill_image_ratio_str, ratio);

		}

		// Wrap image if necessary
		imagefillWrapperClass = imagefill_str + '-wrapper ';
		if ($this.parent().is('.' + imagefillWrapperClass) === false) {
			imagefillWrapperClass += $this.data(imagefill_class_str) || '';
			$this.wrap('<div class="' + imagefillWrapperClass + '"></div>');
		}
		$wrapper = $this.parent();
		$wrapper.css({
			overflow:'hidden',
			position:'relative'
		});

		// To rectify cases where autoplay was set, but the video didn't play
		if ($this[0].autoplay && $this[0].autoplay !== false) {
			$this[0].play();
		}

		// Make position absolute in order to not upset the first wrapper width and height call in run()
		$this.css({position:'absolute'});
		// If the wrapper has no (min-)height use the height of the image
		if ($wrapper.height() === 0) {
			$wrapper.css('minHeight', currentlyViewedHeight + 'px');
		}
		//console.log(thisHeight, thisWidth, thisAttrHeight, thisAttrWidth, currentlyViewedHeight);

		run.call(this);


		// Focus assist: If data-imagefill-assist is there then when the
		// image is clicked the coordinates as percentages are returned to the console to use in the data-imagefill=""
		$this.on('click', function(e) {

			var $img = $(this),
			width,
			height,
			offset,
			x,
			y;

			if ($img.is('[data-imagefill-assist]')) {
				width = $img.width();
				height = $img.height();
				offset = $img.offset();
				x = Math.floor((e.pageX - offset.left) / width * 1000) / 10;
				y = Math.floor((e.pageY - offset.top) / height * 1000) / 10;
				console.log(x + '/' + y);
			}

		});

	};

	$.fn.imagefill = function(options) {

		var o = $.extend(
		{},
		options
	),
	$this = $(this);

	$this.data(imagefill_str, o.align);
	$this.data(imagefill_align_str, o.align);
	$this.data(imagefill_halign_str, o.halign);
	$this.data(imagefill_valign_str, o.valign);
	$this.data(imagefill_class_str, o.className);

	if (o.delay !== undefined) {
		delay = o.delay;
	}

	this.each(function() {
		$collection = $collection.add(this);
	});

	return this.each(function() {

		var img = this,
		$img = $(this),
		width = $img.attr('width'),
		height = $img.attr('height');

		// Imagefill will take advantage of set image width and height attributes; otherwise it waits for the image to load first
		// The following detects whether the width and height attributes are set. When not set a fallback is used.
		if (width === undefined || height === undefined) {
			// Added image already loaded condition to account for an issue encoutered with IE 11 where runonce was not called
			if (img.complete || img.readyState === 4) {
				runonce.call(img);
			}
			else {
				// There was an issue here where in certain circumstances Firefox 35 wasn't showing the correct image height
				$img.on('load', function() {
					runonce.call(img);
				});
			}
		}
		else {
			$img.data(imagefill_image_ratio_str, width / height);
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

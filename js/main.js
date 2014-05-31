"use strict";
var Dancing = {};
Dancing.Kenny = (function($){
  var DEFAULT_FPS = 20;

  var $parentContainer = $('.container');
  var imageNamePrefix = 'img/frames/frame_0';
  var i = 0;
  var numberOfSlides = 68;
  var slideWidth = $parentContainer.width() / numberOfSlides;
  var slideHeight = $parentContainer.height();
  var intervalVar;

  $(function(){ // on DOM ready: pre-load images and add change on hover

    for( ; i < numberOfSlides; i++) {
      // preload image
      var img = new Image();
      img.src = getImageSrc(i);

      var $imageSlice = $('<div class="img-slice"></div>');
      $imageSlice.css('width', slideWidth)
                 .css('height', slideHeight)
                 .on('mouseenter',
                      (function(index){ // closure so we lock in img
                        return function(){ changeBackgroundImage(index) }
                      })(i)
                    );
      $parentContainer.append($imageSlice);
    }
  });

  var play = function(framesPerSecond) {
    console.log('playing');
    framesPerSecond = framesPerSecond || DEFAULT_FPS;
    var intervalMs = 1000 / framesPerSecond;
    var index = 0;
    var changeBgFunc = function() {
      changeBackgroundImage(index++);
      if(index == numberOfSlides-1) { index = 0; }
    };

    intervalVar = setInterval(changeBgFunc, intervalMs);
  }

  var stopPlaying = function() {
    console.log('stopped playing');
    window.clearInterval(intervalVar);
  }

  /*
   * Generates image source with specifed index
   */
  var getImageSrc = function(imgIndex) {
    return [imageNamePrefix, ((imgIndex < 10) ? '0'+imgIndex : imgIndex), '.gif'].join('');
  }

  /**
   * Switches background image of $parentContainer to image at specified index
   */
  var changeBackgroundImage = function(index) {
    var imgSrc = getImageSrc(index);
    $parentContainer.css('background-image', ["url('", imgSrc, "')"].join(''));
  }

  return { // public functions
    play: play,
    stopPlaying: stopPlaying
  }

})(window.jQuery);

"use strict";
var Dancing = {};
Dancing.Kenny = (function($){
  var DEFAULT_FPS = 20;

  var $slideContainer = $('.screen');
  var imageNamePrefix = 'img/frames/frame_0';
  var i = 0;
  var numberOfSlides = 68;
  var slideWidth = $slideContainer.width() / numberOfSlides;
  var slideHeight = $slideContainer.height();
  var intervalVar;

  $(function(){ // on DOM ready: pre-load images and add change on hover

    setupButtons();
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
      $slideContainer.append($imageSlice);
    }
  });

  var setupButtons = function() {
    var $buttons = {
      groove: $('#groove-btn'), glide: $('#glide-btn'),
      country: $('#country-btn'), booty: $('#booty-btn')
    };

    function clearSelections() {
      $('#bottom-nav ul li').removeClass('selected');
    }
    function selectBtn(e) {
      var $button = $(e.currentTarget);
      clearSelections();
      $button.addClass('selected');
    }

    for( var btnKey in $buttons ) {
      var $btn = $buttons[btnKey];
      $btn.off('click')
          .on('click', selectBtn);
    }
  }

  var play = function(framesPerSecond) {
    console.log('playing');
    stopPlaying();

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
    if(intervalVar) { // exists
      window.clearInterval(intervalVar);
    }
  }

  /*
   * Generates image source with specifed index
   */
  var getImageSrc = function(imgIndex) {
    return [imageNamePrefix, ((imgIndex < 10) ? '0'+imgIndex : imgIndex), '.gif'].join('');
  }

  /**
   * Switches background image of $slideContainer to image at specified index
   */
  var changeBackgroundImage = function(index) {
    var imgSrc = getImageSrc(index);
    $slideContainer.css('background-image', ["url('", imgSrc, "')"].join(''));
  }

  return { // public functions
    play: play,
    stopPlaying: stopPlaying
  }

})(window.jQuery);

"use strict";
var Dancing = {};
Dancing.Kenny = (function($){
  var DEFAULT_FPS = 20;

  var $slideContainer = $('.screen');
  var imageNamePrefix = 'img/frames/frame_0';
  var iconsLoc = 'img/icons/';
  var i = 0;
  var numberOfSlides = 68;
  var slideWidth = $slideContainer.width() / numberOfSlides;
  var slideHeight = $slideContainer.height();
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
      $slideContainer.append($imageSlice);
    }

    setupButtons();
  });

  var stopPlayingAllTracks = function() {
    var $audioElements = $('audio');
    var i = 0;

    for( ; i < $audioElements.length; i++) {
      $audioElements[i].pause();
    }
  }

  var setupButtons = function() {
    function clearSelections() {
      $('#bottom-nav ul li').removeClass('selected');
    }
    function selectBtn(e) {
      var $button = $(e.currentTarget);
      var audioId = $button.data('audio-track-id');
      var $audio = $('#' + audioId);
      var framesPerSecond = $button.data('fps');

      clearSelections();
      $button.addClass('selected');

      stopPlayingAllTracks();
      play(framesPerSecond);
      $audio[0].play();
    }

    var buttons = {
      groove: {
        $: $('#groove-btn'),
        img: 'groove.png',
        selectedImg: 'groove-pressed.png'
      },
      glide: {
        $: $('#glide-btn'),
        img: 'glide.png',
        selectedImg: 'glide-pressed.png'
      },
      country: {
        $: $('#country-btn'),
        img: 'country.png',
        selectedImg: 'country-pressed.png'
      },
      booty: {
        $: $('#booty-btn'),
        img: 'booty.png',
        selectedImg: 'booty-pressed.png'
      }
    };

    for( var btnKey in buttons ) {
      var button = buttons[btnKey];
      var $btn = button['$'];
      var img = new Image();
      var selectedImg = new Image();

      // prefetch button images
      img.src = [iconsLoc, button.img].join('');
      selectedImg.src = [iconsLoc, button.selectedImg].join('');

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

"use strict";

$(function(){


  var $parentContainer = $('.container');
  var imageNamePrefix = 'img/frames/frame_0';
  var i = 0;
  var numberOfSlides = 68;
  var slideWidth = $parentContainer.width() / numberOfSlides;
  var slideHeight = $parentContainer.height();

  for( ; i < numberOfSlides; i++) {

    // preload image
    var img = new Image();
    img.src = getImageSrc(i);

    var bgImgCSS = ["url('", img.src, "')"].join('');
    var $imageSlice = $('<div class="img-slice"></div>');
    $imageSlice.css('width', slideWidth)
               .css('height', slideHeight)
               .on('mouseenter',
                    (function(imgSrc){ // closure so we lock in img
                      return function(){ changeBackgroundImage(imgSrc) }
                    })(bgImgCSS)
                  );

    $parentContainer.append($imageSlice);
  }

  play();

  function play() {
    console.log('playing');
    var index = 0;
    var changeBgFunc = function() {
      changeBackgroundImage(index++);
      if(index == numberOfSlides-1)
        index = 0;
    };

    var intervalVar = setInterval(changeBgFunc, 32);
  }

  /*
   * Generates image source with specifed index
   */
  function getImageSrc(imgIndex) {
    return [imageNamePrefix, ((imgIndex < 10) ? '0'+imgIndex : imgIndex), '.gif'].join('');
  }

  /**
   * Switches background image of $parentContainer to image at specified index
   */
  function changeBackgroundImage(index) {
    var imgSrc = getImageSrc(index);
    $parentContainer.css('background-image', imgSrc);
  }

});

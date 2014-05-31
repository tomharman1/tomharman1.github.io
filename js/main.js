"use strict";

$(function(){


  var $parentContainer = $('.container');
  var imageNamePrefix = 'img/frames/frame_0';
  var i = 0;
  var numberOfSlides = 68;
  var slideWidth = $parentContainer.width() / numberOfSlides;
  var slideHeight = $parentContainer.height();

  for( ; i < numberOfSlides; i++) {

    var img = new Image();
    img.src = [imageNamePrefix, ((i < 10) ? '0'+i : i), '.gif'].join('');

    var bgImgCSS = ["url('", img.src, "')"].join('');
    var $imageSlice = $('<div class="img-slice"></div>');
    $imageSlice.css('width', slideWidth)
               .css('height', slideHeight)
               .on('mouseenter',
                    (function(imgSrc){ // closure so we lock in img
                      return function(){ $parentContainer.css('background-image', imgSrc); }
                    })(bgImgCSS)
                  );

    $parentContainer.append($imageSlice);
  }

  play();

  function play() {
    console.log('playing');
  }

});

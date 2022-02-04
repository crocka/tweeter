$(() => {

  $('.nav-right').hover(function () {

    loop($('.fa-angles-down'));

  }, function () {//motion stop when mouse leaves

    $('.fa-angles-down').stop(true);

  });

});

const loop = function ($bouncer) {

  //write animation
  $($bouncer).animate({ 'margin': '10' }, {
    duration: 100,
    //after completion, we animate back to the original position and call loop() again;
    complete: function () {
      $($bouncer).animate({ margin: 0 }, {
        duration: 500,
        complete: loop($bouncer)
      });
    }
  });
};
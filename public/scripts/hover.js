$(() => {

  $('.nav-right').hover(function () {

    loop($('.fa-angles-down'));

  }, function () {//motion stop when mouse leaves

    $('.fa-angles-down').stop(true);

  });

});

const loop = function ($bouncer) {

  $($bouncer).animate({ 'margin': '10' }, {
    duration: 100,
    complete: function () {
      $($bouncer).animate({ margin: 0 }, {
        duration: 500,
        complete: loop($bouncer)
      });
    }
  });
};
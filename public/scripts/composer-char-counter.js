$(document).ready(function () {
  // --- our code goes here ---

  $('#tweet-text').on('input', function (e) {

    let counter = $(this).val().length;

    $('.counter').html(140 - counter);

    if (counter > 140) {

      $('.counter').css('color', 'red');

    } else if (counter <= 140) {

      $('.counter').css('color', '');

    }

  });

});
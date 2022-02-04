$(() => {

  $('.tweets').hover(function () {

    $('.tweets').css('box-shadow', '5px 10px #315561');
    console.log('helasdf')

  }, function () {

    $('.tweets').css('box-shadow', '');

  });

});
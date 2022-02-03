$(document).ready(function () {

  $('.tweets').hover(function () {

    $(this).css('box-shadow', '5px 10px #315561');

  }, function () {

    $(this).css('box-shadow', '');

  });

  $('.tweets .flags i').hover(function () {

    $(this).css('color', '#C4462B');

  }, function () {

    $(this).css('color', '');

  });

});
$(() => {
  // $('.float').hide();

  $('.float').hide();

  $(window).scroll(function () {
    $(window).scrollTop() < 88 ? $('.float').hide() : $('.float').show();
    
  });

  $('.float').click(function () {

    $('.float').hide();
    $('#submitTweet').slideDown();
    $('html').animate({scrollTop : 0}, 2000);
    
  });

});

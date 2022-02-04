$(() => {

  $('.float').hide();//default is hidden

  $(window).scroll(function () { //detect scroll
    //check scrollTop to detect whether to show button
    $(window).scrollTop() < 88 ? $('.float').hide() : $('.float').show();
    
  });

  $('.float').click(function () {

    //hide the button, show the form area, and scroll to top
    $('.float').hide();
    $('#submitTweet').slideDown();
    $('html').animate({scrollTop : 0}, 2000);
    
  });

});

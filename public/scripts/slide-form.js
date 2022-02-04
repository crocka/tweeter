$(() => {
 
 //click on the right side of the navigation bar
  $('.nav-right').click(function () {

    //if the textarea is hidden, show it, otherwise, hide it
    $('#submitTweet').is(':hidden') ? $('#submitTweet').slideDown() : $('#submitTweet').slideUp();

  });

});
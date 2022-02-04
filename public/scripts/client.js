/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {

  const newTweetScript = `

  <article class='tweets'>
  <span>
    <div>
      <img class='avatar' src=${tweet.user.avatars}>
      <h3 for="name">${tweet.user.name}</h3>
    </div>
    
    <h3 for="userId">${tweet.user.handle}</h3>
  </span>


  <p>
    ${tweet.content.text}
  </p>


  <footer>
    <div for='post-time'>
    ${timeago.format(tweet.created_at)}
    </div>
    <div class='flags'>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>
  `

  return newTweetScript;

};

const renderTweets = function (tweets) {

  tweets.forEach((tweet) => {

    $('.container .new-tweet').prepend(createTweetElement(tweet));

  });

};

const slideError = function ($error) {

  $error.slideDown();

  setTimeout(() => {

    if (!$error.is(":hidden")) {

      $error.slideUp();

    }

  }, 3000);

};

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

$(() => {

  //hover for arrow motion
  $('.nav-right').hover(function () {

    loop($('.fa-angles-down'));

  }, function () {//motion stop when mouse leaves

    $('.fa-angles-down').stop(true);

  });

  //click on the right side of the navigation bar
  $('.nav-right').click(function () {

    //if the textarea is hidden, show it, otherwise, hide it
    $('#submitTweet').is(':hidden') ? $('#submitTweet').slideDown() : $('#submitTweet').slideUp();

  });

  //get request for the previous tweets
  $.get('/tweets', (data) => {

    renderTweets(data);

  });

  //hide the errors and the text area
  $("#no-content").hide();
  $('#exceed-limit').hide();
  $('#submitTweet').hide();

  //ajax submit request
  $('#submitTweet').submit(function (event) {

    event.preventDefault();

    //slide error up everytime clicking the submit button
    $("#no-content").slideUp();
    $('#exceed-limit').slideUp();

    const tweetText = $('#submitTweet').serialize();
    const text = tweetText.split('=')[1];

    // tweetText = $("<p>").text(tweetText);

    // console.log(tweetText);

    // console.log($('#tweet-text'))

    
    

    if (text) { //if the input is empty, show no-content error

      if (text.length <= 140) { //if the input is too long, show exceed-limit error

        $.post('/tweets', tweetText).then((data) => {

          $.get('/tweets', (data) => {

            renderTweets(data);

            //clear text area and reset counter
            $('#tweet-text').val('');
            $('.counter').val(140);

          })
        });

      } else {

        slideError($('#exceed-limit'));

      }

    } else {

        slideError($('#no-content'));

    }
    

  });

});

// tweetText.split('=')[1] ? (tweetText.split('=')[1].length <= 140 ? $.post('/tweets', tweetText).then((data) => {
    //   $.get('/tweets', (data) => {

    //     renderTweets(data);

    //     //clear text area and reset counter
    //     $('#tweet-text').val('');
    //     $('.counter').val(140);

    //   })
    // }) : slideError($('#exceed-limit'))) : slideError($('#no-content'));
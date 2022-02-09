/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//return the html code for each new tweet created
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

  <p>${escape(tweet.content.text)}</p>

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

//escape function as given by compass
const escape = function (str) {

  let div = document.createElement("div");

  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
  
};

//append the the array of tweets to index.html
const renderTweets = function (tweets) {
  
  tweets = tweets.reverse(); //reverse the tweets object

  for(const tweet of tweets) {

    $('.container .new-tweet').append(createTweetElement(tweet));

  }

};

//error would slide down and slide back up in 3 seconds
const slideError = function ($error) {

  $error.slideDown();

  setTimeout(() => {

    if (!$error.is(":hidden")) {

      $error.slideUp();

    }

  }, 3000);

};

//function to activate tweetsHovering
const tweetsHover = function () {

  $('.tweets').hover(function () {

    $(this).css('box-shadow', '5px 10px #315561');

  }, function () {

    $(this).css('box-shadow', '');

  });

};

$(() => {

  //get request for the previous tweets
  $.get('/tweets', (data) => {

    renderTweets(data);
    tweetsHover();

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

    if (text) { //if the input is empty, show no-content error

      if (text.length <= 140) { //if the input is too long, show exceed-limit error

        $.post('/tweets', tweetText).then((data) => {

          $.get('/tweets', (data) => {

            //put the last element onto the top of the tweet thread
            $('.container .new-tweet').prepend(createTweetElement(data[data.length - 1]));

            //clear text area and reset counter
            $('#tweet-text').val('');
            $('.counter').val(140);

            tweetsHover();

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
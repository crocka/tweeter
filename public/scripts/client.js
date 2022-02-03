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
    <script href="dist/timeago.js" type="text/javascript">
    ${tweet.created_at}
    </script>
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

  tweets.reverse().forEach((tweet) => {

    $('.container .new-tweet').append(createTweetElement(tweet));

  });

};

$(() => {

  $('#submitTweet').submit(function (event) {

    event.preventDefault();

    const tweetText = $('#submitTweet').serialize();

    $.ajax({

      type: 'post',
      url:'/tweets',
      data: tweetText,
    });


    // tweetText.split('=')[1] ? $.post('/tweets', tweetText) : alert('The input is empty');

    // console.log(tweetText.split('='));

  });

  $.get('/tweets', (data) => {

    renderTweets(data);

  });

});
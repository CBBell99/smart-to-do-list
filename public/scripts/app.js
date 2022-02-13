// Client facing scripts here



$(document).ready(function() {
  // const inputData = $('#item_input').val()

  // console.log(inputData);

  console.log('hello')

  $('#submitbutton').on('click', function() {
    console.log('hello')
    event.preventDefault();
    const inputData = $('#item_input').val()
    console.log(inputData)
  })

  const createNewItem = function(inputData) {

    const $checkbox = $('<td>').text('checkbox');
    const $newItem = $('<td>').text(`${inputData.content.text} hello`);
    const $itemBox = $('<tr>').addClass('first');

    // $itemBox.append($checkbox, $newItem);

    // const $table = $('<table>').addClass('to_do_4')

    return $todo4
  }


  const renderChecklist = function(inputData) {
    const $insideOfTable = ('#to_do_4').find('<table>')
    const $insideOfTR = createNewItem(inputData)
    return $insideOfTable.append($insideOfTR)

  }

  renderChecklist(inputData);

  console.log(renderChecklist(inputData));

});




// const $todo4 = .append($checkbox, $newItem);

// const renderTweets = function(tweets) {
//   const $tweetContainer = $('.tweetcontainer');
//   $tweetContainer.empty();

//   for (let tweet of tweets) {
//     let $returnValue = createTweetElement(tweet)
//     $tweetcontainer.prepend($returnValue)
//   }
//   return $tweetContainer
// };




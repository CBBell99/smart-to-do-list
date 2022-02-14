// Client facing scripts here



$(document).ready(function() {


  $('#submitbutton').on('click', function(event) {
    event.preventDefault();
    const inputData = $('#item_input').val()
    console.log(inputData)
  })

  const createNewItem = function(data) {
    let $todo4 = `
      <td>CHECKBOX</td>
      <td>${data.content.body}</td>
    `
    console.log(data.content.body)

    // const $checkbox = $('<td>').text('checkbox');
    // const $newItem = $('<td>').text(`${inputData.content.text}`);
    // const $itemBox = $('<tr>').addClass('first');
    // $itemBox.append($checkbox, $newItem);
    // const $table = $('<table>').addClass('to_do_4')

    return $todo4
  }



  const renderChecklist = function(inputData) {

    $('#first').append(inputData);
  }

  renderChecklist(createNewItem)

  // renderChecklist(inputData);

  // console.log(renderChecklist(inputData));

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




// Client facing scripts here



$(document).ready(function() {



  const createNewItem = function(data) {
    let $todo4 = `
    <td>CHECKBOX</td>
    <td>${data.content.body}</td>
    `
    console.log(data.content.body)


    return $todo4
  }



  const renderChecklist = function(inputData) {
    let data = createNewItem(inputData)
    $('#first').append(data);
  }

  const loadList = function() {
    $.ajax({
      url: '/',
      method: "POST",
      dataType: "JSON"
    })
      .then(function(data) {
        renderChecklist(data)
      })
  }

  loadList();


  $('#submitbutton').on('submit', function(event) {
    event.preventDefault();
    const inputData = $('#item_input').val()
    console.log(inputData)
  })


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




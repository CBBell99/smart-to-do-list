// Client facing scripts here



$(document).ready(function() {
  console.log('jQuery ready')


  const createNewItem = function(data) {
    console.log(data.content.body)
    let $todo4 = `
 <td   class ="right"><input type="checkbox" id="checkbox"></td>
          <td class ="left">${data.content.body}</td>


          `


    return $todo4
  }

  // <td>CHECKBOX</td>
  // <td>${data.content.body}</td>


  const renderChecklist = function(inputData) {
    for (let item of inputData) {
      let newItem = createNewItem(item)
      $('#first').append(newItem);
    }
  }

  const loadList = function() {
    $.ajax({
      url: '/api/tasks/item',
      method: "GET",
      dataType: "JSON"
    })
      .then(function(data) {
        renderChecklist(data)
      });
  };

  loadList();


  $('#submitbutton').on('submit', function(event) {
    event.preventDefault();
    const inputData = $('#item_input').val()
    console.log(inputData)
    $.ajax({
      url: "/item",
      method: "POST",
      data: inputData
    })
      .then(() => {
        loadList()
      })
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




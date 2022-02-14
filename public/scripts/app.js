// Client facing scripts here



$(document).ready(function() {
  console.log('jQuery ready')


  const createNewItem = function(data) {
    console.log(data.tasks)
    //     let $todo4 = `
    //  <td   class ="right"><input type="checkbox" id="checkbox"></td>
    //           <td class ="left">${data.content.body}</td>


    //           `
    //     return $todo4
  }



  // <td>CHECKBOX</td>

  const renderChecklist = function(inputData) {
    // for (let item of inputData) {
    let newItem = createNewItem(inputData)
    $('#first').append(newItem);
    // }
  }

  const loadList = function() {
    $.ajax({
      url: "/api/tasks",
      method: "GET",
      dataType: "JSON"
    }).then(function(data) {
      renderChecklist(data)
    });
  };
  // const loadList = function() {
  //   $.get('/tasks/item')
  //     .then((data) => {
  //       renderChecklist(data.tasks)
  //     })
  // }

  loadList();



  $('#submit_item').on('submit', function(event) {
    event.preventDefault();
    const inputData = $('#item_input').val()
    return $.ajax({

      url: "/api/tasks/item/",
      method: "POST",
      data: { text: inputData }
    })
      .then(() => {
        console.log("sucess")
        $("form").trigger("reset");
        // $('#item_input').val('')
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




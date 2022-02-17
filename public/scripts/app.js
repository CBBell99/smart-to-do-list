// Client facing scripts here

$(document).ready(function() {



  const addToWatch = function(inputData) {
    let item = inputData
    $('#first').append(createNewItem(item));
  }

  const addToRead = function(inputData) {
    let item = inputData
    $('#second').append(createNewItem(item));
  }

  const addToEat = function(inputData) {
    let item = inputData
    $('#third').append(createNewItem(item));
  }

  const addToBuy = function(inputData) {
    let item = inputData
    $('#fourth').append(createNewItem(item));
  }

  const thingToDo = {
    movie: addToWatch,
    book: addToRead,
    eat: addToEat,
    buy: addToBuy
  }

const checkGoogle = function(userInput) {
  const url = `https://kgsearch.googleapis.com/v1/entities:search?key=AIzaSyB410NqEuxJXSgASG7AEB2NvwtlI2StP4U&query=${userInput}`
    return $.get(url)
      .then(data => {
        const results = data.itemListElement;
        const arrOutput = [];
        results.forEach(arrItem => arrOutput.push(arrItem.result['@type']));

        for (let words of arrOutput[0]) {
          if (words === 'Movie' || words === "MovieSeries" || words === 'TVSeries') {
            return 'movie'
          }
          if (words === 'Book' || words === 'BookSeries') {
            console.log('Book', userInput)
            return 'book'
          }
          if (words === 'Restaurant') {
            console.log("Eat", userInput)
            return 'eat'
          }
        }
            return 'buy'
      })
  }

  // Append a new list item into the table
  const createNewItem = function(data) {
    let $newItem = `
    <tr>
    <td  class ="right"><input type="checkbox" id="checkbox"></td>
    <td  class ="left">
      <div class="dropdown">
        <button class="dropbtn">${data}</button>
        <div class="dropdown-content">
          <a>Edit</a>
          <a class="deletebtn">Delete</a>
        </div>
      </div>
    </div></td>
  </tr> `
    return $newItem
  }

  // load info and start function calls
  const loadList = function() {
    $.ajax({
      url: "/api/tasks",
      method: "GET",
      dataType: "JSON"
    }).then(function(data) {
      // renderChecklist(data)
      // iterate through array
    });
  };

  // Load list on page start
  loadList();

  // send info when pushing submit button
  $('#submit_item').on('submit', function(event) {
    let cateogoryType;
    event.preventDefault();
    console.log('we are here!')
    const inputData = $('#item_input').val()
    checkGoogle(inputData).then ((type) => {
      cateogoryType = type;
      return $.ajax({
        url: "/api/tasks/item",
        method: "POST",
        data: { text: inputData,
                category: type}
      })
        .then((res) => {
          $("form").trigger("reset");
          thingToDo[cateogoryType](inputData);
        })
    })
  })

  // Delete
  $(document).on('click', '.deletebtn', function (e) {
    e.preventDefault()
    $(this).parents('.left').parent().remove();

  });

 // Edit Watch
 $(document).on('click', '.addToWatch', function (e) {
  e.preventDefault()
  addtoWatch($(this).parents('.left'));
  $(this).parents('.left').parent().remove();
  });

  $(document).on('click', '.addToRead', function (e) {
    e.preventDefault()
    addtoRead($(this).parents('.left'));
    $(this).parents('.left').parent().remove();
    });




  // Cross out
  $(function () {
    console.log('Inside cross out');
    $(document).on('change', 'input:checkbox', function () {
      if ($(this).is(':checked')) {
        console.log("checked inside if");
        $(this).parent().siblings('.left').find('.dropbtn').css('text-decoration', 'line-through');
      } else {
        console.log("checked inside else");
        $(this).parent().siblings('.left').find('.dropbtn').css('text-decoration', 'none');
      }
    });
  });


});


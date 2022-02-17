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

    const options = {
      uri: 'https://kgsearch.googleapis.com/v1/entities:search?',
      qs: {
        key: 'AIzaSyB410NqEuxJXSgASG7AEB2NvwtlI2StP4U',
        query: userInput,
        limit: 5,

      }
    }

const url = `https://kgsearch.googleapis.com/v1/entities:search?key=AIzaSyB410NqEuxJXSgASG7AEB2NvwtlI2StP4U&query=${userInput}`







    return $.get(url)
      .then(data => {

        // const results = JSON.parse(data).itemListElement;
        const results = data.itemListElement;
        const arrOutput = [];
        console.log('data', data)
        results.forEach(arrItem => arrOutput.push(arrItem.result['@type']));
        console.log(arrOutput[0])
        // console.log(arrOutput)
        // let flatArr = arrOutput.flat()

        // array of search types
        // const type = ['Book', 'Movie', 'MovieSeries', 'TVSeries', 'Restaurant', 'ProductModel']

        for (let words of arrOutput[0]) {
          if (words === 'Movie' || words === "MovieSeries" || words === 'TVSeries') {
            // addToWatch(inputData)
            return 'movie'


            // retur
          }
          if (words === 'Book' || words === 'BookSeries') {
            console.log('Book', userInput)
            // addToRead(inputData)
            return 'book'
            // return
          }
          if (words === 'Restaurant') {
            console.log("Eat", userInput)
            // addToEat(inputData)
            return 'eat'
            // return
          }
        }
          // addToBuy(inputData)
            return 'buy'
            // return

      })
  }

  console.log('jQuery ready')

  // function to append a new list item into the table
  const createNewItem = function(data) {
    let $todo4 = `
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
    return $todo4
  }

  // function that takes the data from the POST and runs createNewItem something
  // individual ones for each list are below for when we get to that part
  const renderChecklist = function(inputData) {
    let item = inputData.tasks[inputData.tasks.length - 1]
    $('#first').append(createNewItem(item.description));

  }

  // load info and start function calls
  const loadList = function() {
    $.ajax({
      url: "/api/tasks",
      method: "GET",
      dataType: "JSON"
    }).then(function(data) {
      renderChecklist(data)
      // iterate through array
    });
  };

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
          // $('#item_input').val('')
          // checkGoogle(res.description)
          // loadList()
        })
    })
  })




  // Delete
  $(function () {
    console.log('Inside del function');
    $(".deletebtn").click(function () {
      $(this).parents('.left').parent().remove();

    });
  });

  // Cross out
  $(function () {
    console.log('Inside cross out');
    $('input:checkbox').on('change', function () {
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


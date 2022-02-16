// Client facing scripts here



$(document).ready(function() {

  console.log('jQuery ready')

  // function to append a new list item into the table
  const createNewItem = function(data) {
    let $todo4 = `
      <tr>
        <td class ="right"><input type="checkbox" id="checkbox"></td>
        <td class ="left">${data}</td></tr> `
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
    });
  };

  loadList();


  // send info when pushing submit button
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


// functions for each
const addToWatch = function(inputData) {
  let item = inputData.tasks[inputData.tasks.length - 1]
  $('#first').append(createNewItem(item.description));
}

const addToRead = function(inputData) {
  let item = inputData.tasks[inputData.tasks.length - 1]
  $('#second').append(createNewItem(item.description));
}

const addToEat = function(inputData) {
  let item = inputData.tasks[inputData.tasks.length - 1]
  $('#third').append(createNewItem(item.description));
}

const addToBuy = function(inputData) {
  let item = inputData.tasks[inputData.tasks.length - 1]
  $('#fourth').append(createNewItem(item.description));
}

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

});




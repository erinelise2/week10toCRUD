// CRUD = Create, Read, Update, Delete (Post, Get, Put, Delete) Declaring a URL endpoint. Can be an API (using AJAX) or local db.json. Command to install json: npm i -g json-server If you use local, *** type: json-server --watch db.json into terminal. **** had to add an npx to the beginning of the command.**** Then use that url below.  //

const fieldNotes_URL = 'http://localhost:3000/fieldNotes/'

// Create a code that loops over data and adds information to DOM. Want to figure out how to move the lines so that the soonest deadline moves to the top //
$.get(fieldNotes_URL).then((data) =>
  data.map((observation) => {
    $('tbody').append(
      $(`
    <tr>
      <td><button onclick="updateObservation(${observation.id})"}>✐</button></td>
      <td>${observation.observationName}</td>
      <td>${observation.classification}</td>
      <td>${observation.location}</td>
      <td>${observation.locationType}</td> 
      <td>${observation.date}</td>
      <td>${observation.timeOfDay}</td>
      <td>
        <button onclick="deleteObservation(${observation.id})"}>🗑</button>
      </td>
    </tr>
    `)
    )
  })
)

//Post/Adding new observation //
function addObservation(){
  const newObservation = {
    "observationName": $('#newObservation').val(),
    "classification": $("[name='classoptradio']:checked").val(),
    "location": $('#newLocation').val(),
    "locationType": $("[name='locationoptradio']:checked").val(),
    "date": $('#newDate').val(),
    "timeOfDay": $("[name='timeoptradio']:checked").val(),
  }  
  console.log(newObservation)
  $.ajax({
    url: `http://localhost:3000/fieldNotes/`,
    type: 'POST',
    data: JSON.stringify(newObservation),
    contentType: 'application/json'
  });
console.log("this worked")
}

//Deleting existing obesrvation ASCII trash bin: 🗑 from lab //
function deleteObservation(id) {
    $.ajax(`${fieldNotes_URL}/${id}`, {
      type: 'DELETE',
    })
}

//Updating information //
function updateObservation() {
    let id = $('#updateId').val()

      $.ajax(`${fieldNotes_URL}/${id}`, {
      method: 'PUT',
      data: {
        observationName: $('#updateObservation').val(),
        classification: $("[name='classoptradio']:checked").val(),
        location: $('#updateLocation').val(),
        locationType: $("[name='locationoptradio']:checked").val(),
        date: $('#updateDate').val(),
        timeOfDay: $("[name='timeoptradio']:checked").val(),
      },
    })
  }

 // event listener to update task when button is clicked or? $("#updateTaskButton").on("click", (e) => updateTask(e)) //
  $('#updatenObservation').click(updateObservation);

 
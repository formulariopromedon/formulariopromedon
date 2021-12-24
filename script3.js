
// function getValues (event) {


// console.log("hola")
//     var formData = new FormData(); // Currently empty
// console.log(formData)
// }

function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());
  value.OBSERVAÇÕES = data.getAll('OBSERVAÇÕES');
    console.log({ value });
    sendJSON(value)
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);



  function sendJSON(value){

  let xhr = new XMLHttpRequest()
  let url = "https://prod-02.brazilsouth.logic.azure.com:443/workflows/ede5c8cc43c948528bbba74d8372a83b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dAjOqyVFBZIK3tEQPuQyUiIqZEzgFImdAF9V_Z8qJdY";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result.innerHTML = this.responseText
    }
};
// Converting JSON data to string
var data = JSON.stringify({ value });
  
// Sending data with the request
xhr.send(data);
}
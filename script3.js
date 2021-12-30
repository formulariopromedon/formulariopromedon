
//Arma el JSON del formulario
function handleSubmit(event) {
    event.preventDefault();
    console.log("entre al handler")

    const data = new FormData(event.target);

  const value = Object.fromEntries(data.entries());
  value.OBSERVAÇÕES = data.getAll('OBSERVAÇÕES');
    console.log({ value });
    updateOnlineStatus(value)
  }
  
 function indexedDBa(value) {
    let baseDatos;
    let solicitudConexion = indexedDB.open('notasBd', 2);

    solicitudConexion.onsuccess = function(evento) {
        baseDatos = evento.target.result;
        addNota(value)
    }

    solicitudConexion.onerror = function(evento) {
        document.querySelector('#contenido').innerText = `Error al abrir la base de datos: ${evento.target.errorCode}`;
     }

    solicitudConexion.onupgradeneeded = function(evento) {
        baseDatos = evento.target.result;

        // let notas = baseDatos.createObjectStore('notas', {autoIncrement: true});
    }

    // document.querySelector('#btnAgregar').addEventListener('click', function(evento) {
        // let contenido = document.querySelector('#contenido').value;
      function addNota(value){
        if(value){
            let transaccion = baseDatos.transaction(['notas'], 'readwrite');
            let notas = transaccion.objectStore('notas');
           let nota = {value};  // estampa_tiempo: Date.now()
            notas.add(nota);

            transaccion.oncomplete = function() {
                document.querySelector('#resultado').innerText = 'La nota se ha creado de forma satisfactoria.';
            }

            transaccion.onerror = function(evento) {
                document.querySelector('#resultado').innerText = `Error al intentar almacenar una nota: ${evento.target.errorCode}`;
            }

        } else {
            document.querySelector('#resultado').innerText = 'No ha escrito ningún valor en el campo contenido.';
        }}}

 //Handlea la acción según status de conexión
  function updateOnlineStatus(value) {

      if(navigator.onLine) {
        sendJSON(value)

      } else{        indexedDBa(value)


      }
  }



//Recepciona el Submit del formulario y distribuye al handler
  const form = document.querySelector('form');
  form.addEventListener('submit',handleSubmit);




  //Envia hacia PowerAutomate
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


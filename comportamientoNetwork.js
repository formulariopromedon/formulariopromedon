// import { collection, query, where, getDocs,doc,setDoc,addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

// import { db } from '/firebase.js';

function cargaIndexToFirestore(){
    var request = window.indexedDB.open('notasBd',3);
        request.onsuccess = function(event) {
            // Use this db variable, not your global one
            var dbI = event.target.result;
    
                // Note that you can also access the db variable using other means
            // here like this.result or request.result, but I like to use event.target
            // for clarity.
    
            // Now work with the db variable
            let transaction = dbI.transaction('notas','readwrite')
            let notas = transaction.objectStore("notas"); // (2)
         
          var request = notas.getAll()
          var currentReadyState = request.readyState;


          request.onerror = function(event) {
            console.log('No se tiene todavia')
          };
          
          request.onsuccess = async function(event) {
           var resultado = request.result;
            for (var i=0; i<resultado.length; i++) {
     

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
            var data = JSON.stringify(resultado[i]);
              
            // Sending data with the request
            xhr.send(data);
            }
             
               let transaccion = dbI.transaction(['notas'], 'readwrite').objectStore('notas');
               var keyRange = IDBKeyRange.upperBound("0")
               transaccion.delete(keyRange)
        
           
           
                
        
        console.log("llegue al final")
            
          }
}}

function cargaIndexToFirestore2() {
  let baseDatos;
  let solicitudConexion = indexedDB.open('notasBd',3);

  solicitudConexion.onsuccess = function(evento) {
      baseDatos = evento.target.result;
      let transaction = baseDatos.transaction('notas','readwrite')
      let notas = transaction.objectStore("notas"); // (2)
      var request = notas.getAll()
      var currentReadyState = request.readyState;
        

      var resultado = request.result;
      for (var i=0; i<resultado.length; i++) {


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
      var data = JSON.stringify(resultado[i]);
        
      // Sending data with the request
      xhr.send(data);
      }
       
         let transaccion = dbI.transaction(['notas'], 'readwrite').objectStore('notas');
         var keyRange = IDBKeyRange.upperBound("0")
         transaccion.delete(keyRange)
      
          
  
  console.log("llegue al final")
      
    }








  solicitudConexion.onerror = function(evento) {
      document.querySelector('#contenido').innerText = `Error al abrir la base de datos: ${evento.target.errorCode}`;
   }

  solicitudConexion.onupgradeneeded = function(evento) {
      baseDatos = evento.target.result;
      let notas = baseDatos.createObjectStore('notas', {autoIncrement: true});
  }

  // document.querySelector('#btnAgregar').addEventListener('click', function(evento) {
      // let contenido = document.querySelector('#contenido').value;
}






















// window.addEventListener('load', () => {
//                 console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
//                 cargaIndexToFirestore()

                
//     })
    
//     window.addEventListener('online', () => { 
//         console.log('Became online')
//             });
    
    
//     window.addEventListener('offline', () => console.log('Became offline'));


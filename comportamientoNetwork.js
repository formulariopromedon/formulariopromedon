import { collection, query, where, getDocs,doc,setDoc,addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

import { db } from '/firebase.js';

function cargaIndexToFirestore(){
    var request = window.indexedDB.open('notasBd');
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
           console.log(db)
           for (var i=0; i<resultado.length; i++) {
           
              await addDoc(collection(db, "Notas"), {
                Nota: resultado[i].contenido,
              })
               }
               let transaccion = dbI.transaction(['notas'], 'readwrite').objectStore('notas');
               var keyRange = IDBKeyRange.upperBound("0")
               transaccion.delete(keyRange)
        
           
           
                
        
        console.log("llegue al final")
            
          }
}}


window.addEventListener('load', () => {
                console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
                cargaIndexToFirestore()

                
    })
    
    window.addEventListener('online', () => { 
        console.log('Became online')
            });
    
    
    window.addEventListener('offline', () => console.log('Became offline'));

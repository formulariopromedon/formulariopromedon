

            let baseDatos;
            let solicitudConexion = indexedDB.open('notasBd', 1);

            solicitudConexion.onsuccess = function(evento) {
                baseDatos = evento.target.result;

            }

            solicitudConexion.onerror = function(evento) {
                document.querySelector('#contenido').innerText = `Error al abrir la base de datos: ${evento.target.errorCode}`;
            }

            solicitudConexion.onupgradeneeded = function(evento) {
                baseDatos = event.target.result;

                let notas = baseDatos.createObjectStore('notas', {autoIncrement: true});
            }

            document.querySelector('#btnAgregar').addEventListener('click', function(evento) {
                let contenido = document.querySelector('#contenido').value;

                if(contenido.length){
                    let transaccion = baseDatos.transaction(['notas'], 'readwrite');
                    let notas = transaccion.objectStore('notas');

                    let nota = {contenido: contenido, estampa_tiempo: Date.now()};
                    notas.add(nota);

                    transaccion.oncomplete = function() {
                        document.querySelector('#resultado').innerText = 'La nota se ha creado de forma satisfactoria.';
                    }

                    transaccion.onerror = function(evento) {
                        document.querySelector('#resultado').innerText = `Error al intentar almacenar una nota: ${evento.target.errorCode}`;
                    }

                } else {
                    document.querySelector('#resultado').innerText = 'No ha escrito ningún valor en el campo contenido.';
                }
            });
        
     document.querySelector('#btnBorrar').addEventListener('click', function(evento) {
        
        let transaccion = baseDatos.transaction(['notas'], 'readwrite').objectStore('notas');
        var keyRange = IDBKeyRange.upperBound("0")
        let registro = transaccion.delete(keyRange)
                    
 //var display=  displayData();
//console.log(display)
   // document.querySelector('#resultado').innerText = `Estas haciendo clic ${info}`;

    });
        

    document.querySelector('#btnBaseDeDatosIndexed').addEventListener('click',async function(evento) {
        var request = window.indexedDB.open('notasBd');
        request.onsuccess = function(event) {
            // Use this db variable, not your global one
            var db = event.target.result;
    
                // Note that you can also access the db variable using other means
            // here like this.result or request.result, but I like to use event.target
            // for clarity.
    
            // Now work with the db variable
            let transaction = db.transaction('notas','readwrite')
            let notas = transaction.objectStore("notas"); // (2)
         
          var request = notas.getAll()
          var currentReadyState = request.readyState;


          request.onerror = function(event) {
            console.log('No se tiene todavia')
          };
          
          request.onsuccess = function(event) {
                    
            console.log(request.result)
            
          }
      
    }})

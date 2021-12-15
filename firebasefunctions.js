
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js'

import { collection, query, where, getDocs,doc,setDoc,addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';
import { db } from '/firebase.js';



window.addEventListener("load", function(event) {
   // console.log("'Todos los recursos terminaron de cargar!");
   // const dba = getDatabase();
    console.log(db)
      
  /*  async function foo() {
        db.collection('Notas')
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data())
console.log(doc)        })
    }
*/
  });


document.querySelector('#btnCargaFirestore').addEventListener('click',async function envioDatosFirestore(){
  let contenido = document.querySelector('#contenido').value;

//async function envioDatosFirestore(){
  console.log("2Entre")
  await addDoc(collection(db, "Notas"), {
    Nota: contenido,
  })
console.log("ya lo registre")})
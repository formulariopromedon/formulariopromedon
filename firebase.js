// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js'
import { getDatabase  } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js'
import { getFirestore,collection,getDocs } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvR0uc-SXJsNDEkzg_L2c04S86ktMbzGs",
  authDomain: "dbofflinep.firebaseapp.com",
  databaseURL: "https://dbofflinep-default-rtdb.firebaseio.com",
  projectId: "dbofflinep",
  storageBucket: "dbofflinep.appspot.com",
  messagingSenderId: "825712782588",
  appId: "1:825712782588:web:241d88ba6c5f88171b7b79"
};

// Initialize Firebase

 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);

window.addEventListener("load", function(event) {
  const database = getDatabase();
  
});


async function getCities(db) {
  const citiesCol = collection(db, 'Notas');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  console.log(cityList)
  cityList.forEach(element => console.log(element));
  console.log("Llegue hasta el final")
  return cityList;}


document.querySelector('#btnBasedDeDatos').addEventListener('click', function(evento) {
 var listadeNotas =  getCities(db)
 console.log(listadeNotas)
 //listadeNotas.forEach(element => console.log(element));       
})

 


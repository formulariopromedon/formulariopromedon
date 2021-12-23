
// function getValues (event) {


// console.log("hola")
//     var formData = new FormData(); // Currently empty
// console.log(formData)
// }


formBR.onsubmit = async (e) => {
    e.preventDefault();
console.log("hola")
var formData = new FormData(formBR); // Currently empty

for(let [name, value] of formData) {
    alert(`${name} = ${value}`)


// let response = await fetch('/article/formdata/post/user', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let result = await response.json();

//     alert(result.message)
}}

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
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

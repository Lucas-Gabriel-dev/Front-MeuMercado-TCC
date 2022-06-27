function Send(){
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const telephone = document.getElementById('telephone').value;
    const birthdate = document.getElementById('birthdate').value;
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const district = document.getElementById('district').value;
    const number = document.getElementById('number').value;
    const complement = document.getElementById('complement').value;
    const cep = document.getElementById('cep').value;

    const user = {
      name: nome,
      email: email,
      password: password,
      telephone: telephone,
      birthdate: birthdate,
      city: city,
      address: address,
      district: district,
      number: number,
      complement: complement,
      cep: cep
    }

    
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        
        token = data
        localStorage.setItem('token', token)

        if(data.error === "Email exists"){
          document.getElementById('emailInvalid').innerHTML = 'Esse email já existe!'
        }

        if(!data.error){
          window.location.replace("/")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
    
}

document.getElementById('buttonRedirec').addEventListener('click', function(){
  window.location.replace("/login")
})
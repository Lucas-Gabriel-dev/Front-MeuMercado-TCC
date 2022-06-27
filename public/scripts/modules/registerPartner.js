function registerPartner(){
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao_emissor').value;
    const cnpj = document.getElementById('cnpj').value;
    const nameMarket = document.getElementById('nameMarket').value;
    const telephone = document.getElementById('telephone').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    

    const user = {
      name: nome,
      email: email,
      password: password,
      telephone: telephone,
      cpf: cpf,
      rg: rg,
      orgaoEmissor: orgaoEmissor,
      cnpj: cnpj,
      market_name: nameMarket,
      market_city: city,
      market_estado: district,
      market_address: address,
      market_number: number
    }

    
    fetch("http://localhost:3000/partner", {
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

document.getElementById('redirectPartner').addEventListener('click', function(){
  window.location.replace("/partnerLogin")
})
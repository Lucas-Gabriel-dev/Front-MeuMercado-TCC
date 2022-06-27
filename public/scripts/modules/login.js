document.getElementById("buttonRegister").addEventListener("click", function(){
  window.location.replace("/register") 
});

let pathname = window.location.pathname.split('/')

if(pathname[1] === "login" || !pathname[1]){
  document.getElementById("buttonPartner").addEventListener("click", function(){
    window.location.replace("/partnerLogin") 
  });
}

if(pathname[1] === "partnerLogin" || !pathname[1]){
  document.getElementById("buttonClient").addEventListener("click", function(){
    window.location.replace("/login") 
  });
}




document.querySelector('form').addEventListener('submit', LogIn, true)

function LogIn(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  var token = localStorage;

    const user = {
        email: email,
        password: password
    }

    fetch("http://localhost:3000/login", {
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
        
        let pathname =  window.location.pathname
          
        if(data.error){
            // window.location.replace(window.location.pathname)
            document.querySelector('#error').innerHTML = "Usuário ou senha incorretos"
        }

        if(!data.error){
          if(pathname === "/partnerLogin"){
            window.location.replace("/myproducts:1") 
          }
          if(pathname === "/login"){
            window.location.replace("/")
          }
        }
        // window.location.replace("/infoAccount_partner")     
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}
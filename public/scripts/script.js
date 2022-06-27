import detailProduct from "./modules/detailProduct.js";
import searchProducts from "./modules/search.js";
import Home from "./modules/home.js";
import addToCart from "./modules/addToCart.js";
import searchForCategoryProducts from "./modules/searchForCategory.js";

// import partnerAccount from './modules/partnerAccount.js'
// import userLogged from './modules/user.js'

const div = document.getElementById('infoUser')
const user =  document.getElementById('userLogged')
document.getElementById("logOut").addEventListener("click", logOut, true);

if(localStorage.token){
    div.style.display = "none";

    user.style.display = "block";

    fetch("http://localhost:3000/logged", {
    method: "GET",
    headers: new Headers({
    Authorization: `Bearer ${localStorage.token}`,
    })}).then((response) => response.json())
    .then(function(data) {
        let authors = data;
        console.log("Success:", data);
        
        if(!data.name){
            partnerAccount()
            return
        }
        document.getElementById('nameUser').innerHTML = data.name
        const cart = document.getElementById('cartUser')
        const lastSection = document.getElementById('lastSection')

        lastSection.style.display = "none"
        cart.style.display = "block"
    })
    .catch(function(error) {
        console.error("Error:", error);

        var div = document.getElementById('products')
        var divError = document.getElementById('error') 
        
        if(error){
            div.style.display = "none";
            divError.style.display = "fixed";

            const redirectButton = document.createElement('a') 
            const message = document.createElement('p')
            
            message.innerHTML = "Você não está logado!"
            redirectButton.innerHTML = "Logar-se"
            redirectButton.href = "/partnerLogin"

            document.getElementById('error').appendChild(message)
            document.getElementById('error').appendChild(redirectButton)
        }
    });

}


function partnerAccount(){
    fetch("http://localhost:3000/partnerlogged", {
    method: "GET",
    headers: new Headers({
    Authorization: `Bearer ${localStorage.token}`,
    })}).then((response) => response.json())
    .then(function(data) {
        let authors = data;
        console.log("Success:", data);
        if(data.error){
            // window.location.replace("./index.html")
        }
    
        document.getElementById('nameUser').innerHTML = data.name_partner
        const myProducts = document.getElementById('myProducts')
        const lastSection = document.getElementById('lastSection')

        lastSection.style.display = "none"
        myProducts.style.display = "block"
    })
    .catch(function(error) {
        console.error("Error:", error);

        if(error){
            // window.location.replace("./index.html")
        }
    });
}


function logOut(){
    localStorage.token = '';
    window.location.replace("/")
}


// document.getElementById("searchButton").addEventListener("click", searchProducts, true);
// const inputValue = document.querySelector("form")
// document.querySelector('form').addEventListener('submit', LogIn, true)

// document.getElementsByClassName("redirectProduct").addEventListener("click", detailProduct, true);



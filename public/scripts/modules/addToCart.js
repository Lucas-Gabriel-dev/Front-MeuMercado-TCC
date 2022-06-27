let pathname = window.location.pathname.split('/')

// if(pathname[1] === "products"){
//     document.getElementById('button').addEventListener("click", addToCart, true)
// }

export default async function addToCart(id){
    const productAddInCart = {
        productId: sessionStorage[`m0`],
        partnerId: sessionStorage[`p0`],
        quantityProduct: 1
    }

    console.log("Success:", id);


    fetch("http://localhost:3000/shoppingcart", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        }),
        body: JSON.stringify(productAddInCart)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if(!data.error){
            window.alert("Produto Adicionado ao carrinho")
        }
    })
    .catch((error) => {
        console.error("Error:", error);

        if(error){
            // window.location.replace("./index.html")
        }
    });
}
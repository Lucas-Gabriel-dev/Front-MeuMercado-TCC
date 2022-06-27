function allProducts(){
    fetch("http://localhost:3000/listproducts", {
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

        addProductsInOptionValue(data)
    })
    .catch(function(error) {
        console.error("Error:", error);

        if(error){
            // window.location.replace("./index.html")
        }
    });
}

allProducts()

var activities = document.getElementById("texto");
console.log(activities)
activities.addEventListener("change", function() {
    if(activities.value){
        console.log(activities.value)
        allProducts();
    }
});

function addProductsInOptionValue(data){{
    const html = {
        get(element){
            return document.querySelector(element)
        }
    }

    const list = {
        optionsValue(data){
            if(activities.value === data.product_name){
               list.itemDetach(data)
            }
            // const datalist = document.createElement('datalist') 
                const option = document.createElement('option') 

                option.value = data.product_name

                // html.get('#options').appendChild(datalist)
                html.get('datalist').appendChild(option)
                // 
            
        },
        itemDetach(data){
            const imageProduct = document.getElementById('file_upload')
            const descriptionProduct = document.getElementById('description')
            const weight = document.getElementById('weight')
            const category = document.getElementById('category')
            

            console.log(data)
            imageProduct.setAttribute('src', `${data.image}`)
            descriptionProduct.innerHTML = data.description
            weight.innerHTML = data.weight
            category.innerHTML = data.type
            
            localStorage.setItem('idProduct', data.id_product)

            console.log(data.product_name)
        }
    }

    data.forEach(list.optionsValue)
}}

document.getElementById('publish').addEventListener("click", addProductsInMarket, true)

async function addProductsInMarket() {
    const productValues = {
        id_product: localStorage.idProduct,
        price: document.getElementById('price').value,
        estoque: document.getElementById('estoque').value
    }
   
    fetch("http://localhost:3000/addproducts", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        }),
        body: JSON.stringify(productValues)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if(!data.error){
            window.alert("Produto adicionado")
            window.location.replace("/addProducts")
        }

        console.log(productValues)
    })
    .catch((error) => {
        console.error("Error:", error);

        if(error){
            // window.location.replace("./index.html")
        }
    });
}
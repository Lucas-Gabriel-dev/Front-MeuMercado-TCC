fetch("http://localhost:3000/productsmarket", {
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

        productInfo(data)

        // document.getElementById('id').innerHTML = authors.id;
        // document.getElementById('name').innerHTML = authors.name;
        // document.getElementById('email').innerHTML = authors.email;
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

function productInfo(productID){ 
    const id_product = window.location.pathname.split("myproducts:")
    
    console.log(parseInt(id_product[1]) )
    
    const products = {
        productId: id_product[1]
    }

    const html = {
        get(element){
            return document.querySelector(element)
        }
    }

    const list = {
        create(item){
            for (var i = 0; i < item.length; i++) { 
                const div = document.createElement('div')   
                const moreInfo = document.createElement('div')  
                const img = document.createElement('img')
                const nameOfProduct = document.createElement('a') 
                const price = document.createElement('p')
                const estoque = document.createElement('p')

                
                if(parseInt(id_product[1]) === item[i].id_product){
                    list.destach(item[i])

                    console.log(id_product[1])
                }
                console.log(item[i].id_product)
               
                // div.setAttribute('id', `item${[i]}`)
                div.classList.add('item')
                moreInfo.classList.add(`moreInfo${item[i].id_product}`)
                img.classList.add('image')
                nameOfProduct.classList.add('ProductName')
                price.classList.add('price')
                estoque.classList.add('estoque')

                moreInfo.setAttribute('id', 'moreInfo2')
                
                nameOfProduct.innerHTML = item[i].product_name
                nameOfProduct.href = '/myproducts:' + item[i].id_product
                img.src = item[i].image
                price.innerHTML = "R$ " + item[i].price
                estoque.innerHTML = "ESTOQUE: " + item[i].estoque

            
                // html.get('.produtos').appendChild(div)
                html.get(`.produtos`).appendChild(img)
                html.get(`.produtos`).appendChild(nameOfProduct)
                html.get('.produtos').appendChild(moreInfo)
                html.get(`.moreInfo${item[i].id_product}`).appendChild(price)
                html.get(`.moreInfo${item[i].id_product}`).appendChild(estoque)
            }
        },
        destach(item){
            const div = document.createElement('div')
            const moreInfo = document.createElement('div')
            const img = document.createElement('img')
            const nameOfProduct = document.createElement('a') 
            const price = document.createElement('p')
            const estoque = document.createElement('p')

            console.log(item)
            div.classList.add('itemPrincipal')
            moreInfo.classList.add('moreInfo')
            img.classList.add('image')
            nameOfProduct.classList.add('ProductName')
            price.classList.add('price')
            estoque.classList.add('estoque')
            
            nameOfProduct.innerHTML = item.product_name
            nameOfProduct.href = '/myproducts:' + item.id_product
            img.src = item.image
            price.innerHTML = "R$ " + item.price
            estoque.innerHTML = "ESTOQUE: " + item.estoque
        
            html.get('.div1').appendChild(div)
            html.get(`.itemPrincipal`).appendChild(img)
            html.get(`.itemPrincipal`).appendChild(nameOfProduct)
            html.get('.itemPrincipal').appendChild(moreInfo)
            html.get(`.moreInfo`).appendChild(price)
            html.get('.moreInfo').appendChild(estoque)
        }
    }
    
    // productID.forEach(list.create)
    list.create(productID)
}

document.getElementById("buttonPlus").addEventListener('click', function(){
    window.location.replace("/addProducts")
})
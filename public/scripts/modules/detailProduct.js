import addToCart from "./addToCart.js";

let pathname = window.location.pathname.split('/')

if(pathname[1] === "products"){
    detailProduct()
}

export default async function detailProduct(){
    const id_product = window.location.pathname.split("products/")
    
    console.log(id_product)
    
    const products = {
        productId: id_product[1]
    }

    try{
        const response = await fetch("http://localhost:3000/detailsproducts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(products)
        })
        
        const data = await response.json()
        
        // const values = await Promise.all(data);
        console.log(data)

        productInfo(data)

        return data
    } catch (error){
        console.log("Error: ", error)
        
        document.querySelector('#error').innerHTML = "Products not Found"
    }

}

function productInfo(productID){ 
    const html = {
        get(element){
            return document.querySelector(element)
        },
        getId(element){
            return document.getElementById(element)
        }
    }

    const list = {
        createItemDetach(product){
            html.get(`.item_grande`).src = product[0].image
            html.get(`.name_item`).innerHTML = product[0].product_name
            html.get(`.p1_melhor`).innerHTML = "R$ " + product[0].price
            html.get(`.p2_melhor`).innerHTML = product[0].market_name
            /** Description */

            html.get('.p').innerHTML = product[0].description
        },
        create(item){
            for (var i = 0; i != item.length; i++) {
                /** DIVs */
                const outros_valores =  document.createElement('div')   
                const div1 =  document.createElement('div')   
                const div2 =  document.createElement('div')   
                const div3 =  document.createElement('div')   

                const p_div1 =  document.createElement('p')   
                const img =  document.createElement('img')   
                const p2 =  document.createElement('p2')   
                const adicionar_sacola =  document.createElement('input')   
                        
                outros_valores.classList.add('outros_valores')
                outros_valores.setAttribute('id', `product${i}`)
                div1.classList.add('div1')
                div1.setAttribute('id', `div1${i}`)
                div2.classList.add('div2')
                div2.setAttribute('id', `div2${i}`)
                div3.classList.add('div3')
                div3.setAttribute('id', `div3${i}`)

                p_div1.classList.add('p_div1')
                p2.classList.add('p2')
                adicionar_sacola.classList.add('adicionar_sacola')
                adicionar_sacola.setAttribute('id', `button${i}`)
                
                p_div1.innerHTML = "R$ " + item[i].price
                img.src =  ''  
                p2.innerHTML = item[i].market_name
                adicionar_sacola.value = "ADICIONAR A SACOLA"
                adicionar_sacola.setAttribute('type', 'button')

                html.get(`.outros`).appendChild(outros_valores)
                html.getId(`product${i}`).appendChild(div1)
                html.getId(`div1${i}`).appendChild(p_div1)
                html.getId(`product${i}`).appendChild(div2)
                html.getId(`div2${i}`).appendChild(img)
                html.getId(`div2${i}`).appendChild(p2)
                html.getId(`product${i}`).appendChild(div3)
                html.getId(`div3${i}`).appendChild(adicionar_sacola)

                sessionStorage.setItem(`p${i}`, item[i].partner_id_partner)
                sessionStorage.setItem(`m${i}`, item[i].id_product)

                html.getId(`button${i}`).addEventListener("click", function(){
                    addToCart(i)
                    console.log(i)
                })
            }
        }
    }
    
    // productID.forEach(list.create)
    list.createItemDetach(productID)
    list.create(productID)
}


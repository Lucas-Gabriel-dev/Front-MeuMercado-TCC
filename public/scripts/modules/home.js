let pathname = window.location.pathname.split('/')

if(pathname[1] === "home" || !pathname[1]){
    Home()

    document.getElementById('imgDestach1').addEventListener('click', function(){
        window.location.replace("/products/54")
    })
    document.getElementById('imgDestach2').addEventListener('click', function(){
        window.location.replace("/products/36")
    })
    document.getElementById('imgDestach3').addEventListener('click', function(){
        window.location.replace("/products/55")
    })
    document.getElementById('imgDestach4').addEventListener('click', function(){
        window.location.replace("/products/56")
    })
}

export default async function Home(){
    fetch("http://localhost:3000/searchproducts", {
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

        show(data)
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

function show(users){
    const products = users;
    // const data = Array.from({length: products.length}).map((_, i) => `${products[i].name}`)

    /* ============================================================ */
    let value = 3
    let id = 0

    let perPage = 12
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(products.length / perPage),
        maxVisibleButtons: 5
    }

    const html = {
        get(element){
            return document.querySelector(element)
        },
        getId(element){
            return document.getElementById(element)
        }
    }

    const controls = {
        next() {
            state.page++

            const lastPage = state.page > state.totalPage
            if(lastPage){
                state.page--
            }
        },
        prev(){
            state.page--

            if(state.page < 1){
                state.page++
            }
        },
        goTo(page){
            if(page < 1){
                page = 1
            }

            state.page = +page

            if(page > state.totalPage){
                state.page = state.totalPage
            }
        },
        createListener(){
            html.get('.first').addEventListener('click', () => {
                controls.goTo(1)
                update()
            })

            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage)
                update()
            })

            html.get('.next').addEventListener('click', () => {
                controls.next()
                update()
            })

            html.get('.prev').addEventListener('click', () => {
                controls.prev()
                update()
            })

        }
    }

    const list = {
        create(item){
            for(let i = 0; i < item.length; i++){
                const box = document.createElement('div')
                const resultado = document.createElement('div')

                const img = document.createElement('img')
                const nameOfProduct = document.createElement('a')
                const price = document.createElement('p')

                value = value + 1

                if(value === 4){
                    value = 0
                    id = id + 1

                    box.setAttribute('id', `line${id}`)
                }

                box.classList.add('box')
                resultado.classList.add('resultado')
                resultado.setAttribute('id', `product${i}`)

                img.classList.add('img')
                nameOfProduct.classList.add('marca')
                price.classList.add('preço')
                
            
                nameOfProduct.innerHTML = item[i].product_name
                nameOfProduct.href = `/products/${item[i].id_product}`
                img.src = item[i].image

                let stylePrice = item[i].price.toFixed([2])
                stylePrice = stylePrice.toString().replace(".", ",")
                price.innerHTML = "R$ " + stylePrice
                
                html.get('.div2').appendChild(box)
                html.getId(`line${id}`).appendChild(resultado)
                html.getId(`product${i}`).appendChild(img)
                html.getId(`product${i}`).appendChild(nameOfProduct)
                html.getId(`product${i}`).appendChild(price) 
            }        
        },
        update(){
            html.get('.div2').innerHTML = ""
            

            let page = state.page - 1
            let start = page * state.perPage
            let end = start + state.perPage

            const paginatedItems = products.slice(start, end)
            console.log(end)
            console.log(products)

            list.create(paginatedItems)
        }
    }

    const buttons = {
        element: html.get('#paginate .numbers'),
        create(number){
            const button = document.createElement('div')

            button.innerHTML = number;

            if(state.page == number){
                button.classList.add('active')
            }

            button.addEventListener('click', (event) => {
                const page = event.target.innerText
                
                controls.goTo(page)
                update()
            })

            buttons.element.appendChild(button)
        },
        update(){
            buttons.element.innerHTML = ""
            const { maxLeft, maxRight } = buttons.calculateMaxVisible()

            for(let page = maxLeft; page <= maxRight; page++){
                buttons.create(page)
            }
        },
        calculateMaxVisible(){
            const { maxVisibleButtons } = state
            let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
            let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

            if(maxLeft < 1){
                maxLeft = 1
                maxRight = maxVisibleButtons
            }

            if(maxRight > state.totalPage){
                maxLeft = state.totalPage - (maxVisibleButtons - 1)
                maxRight = state.totalPage

                if(maxLeft < 1){
                    maxLeft = 1
                } 
            }

            return {maxLeft, maxRight}
        }
    }

    function update(){
        list.update()
        buttons.update()
    }

    function init(){
        update()
        controls.createListener()
    }

    init()

}
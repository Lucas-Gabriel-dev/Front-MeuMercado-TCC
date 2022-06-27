let pathname = window.location.pathname.split('/')

if(pathname[2]){
    searchForCategoryProducts()
}

export default async function searchForCategoryProducts(){
    const name = window.location.href.split('=');
   
    const userSearch = {
        product_type: name[1]
    }

    console.log(name)


    try{
        const response = await fetch("http://localhost:3000/results/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userSearch)
        })
        
        const data = await response.json()
        
        if(data[0] != undefined){
            show(data)
        }

        return data
    } catch (error){
        console.log("Error: ", error)
        
        document.querySelector('.list').innerHTML = "Products not Found"
    }

    
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
            const nameSearch = window.location.href.split('=');

            html.get('.itenspage').innerHTML = `${item.length}`
            html.get('.nameSearch').innerHTML = `${nameSearch[1]}`
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

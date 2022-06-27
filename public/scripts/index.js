const mercadoPagoPublicKey = document.getElementById("mercado-pago-public-key").value;
const mercadopago = new MercadoPago(mercadoPagoPublicKey);

myCart()

async function myCart(){
    fetch("http://localhost:3000/productsincart", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
        })
    }).then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        if(data.error){
            window.alert("Você Não tem produtos em seu carrinho")

            window.location.replace("/")
            return
        }

        productsInfo(data)

        localStorage.setItem('valuepay', data[0].price)
        return data
    })
    .catch((error) => {
        console.error("Error:", error);

        const infoMessage = document.getElementById('modelPayment')
        const notLogged = document.getElementById('notLogged')

        infoMessage.style.display = "none"
        notLogged.style.display = "block"

        document.getElementById('linkRedirect').innerHTML = "Você não está logado, clique aqui para entrar!"
        document.getElementById('linkRedirect').href = "/login"

        if(error){
            // window.location.replace("./index.html")
        }

    });
}

const html = {
    get(element){
        return document.querySelector(element)
    },
    idGet(element){
        return document.getElementById(element)
    }
}

function productsInfo(product){ 
    let amount = 0
    // amount = amount.toFixed([2])

    const list = {
        create(product){
            for(let i = 0; i < product.length; i++){
                const divImg = document.createElement('div')
                const img = document.createElement('img')
                
                const divProductDetails = document.createElement('div')
                const divProductInfo = document.createElement('div')
                const titleProduct = document.createElement('h5')
                const description = document.createElement('span')
                const titlePrice = document.createElement('b')
                const valueProduct = document.createElement('span')

                const divQuantity = document.createElement('div')
                const titleQuantity = document.createElement('h5')
                const quantityInput = document.createElement('input')
                
                divImg.classList.add("col-md-3")
                divImg.setAttribute('id', `img${[i]}`) 
                img.setAttribute('class', 'img-fluid mx-auto d-block image')

                divProductDetails.setAttribute('class', `col-md-4 product-detail`) 
                divProductDetails.setAttribute('id', `product${[i]}`)
                divProductInfo.classList.add('product-info')
                description.setAttribute('id', 'product-description')
                titlePrice.classList.add(`titlePrice${[i]}`)
                valueProduct.classList.add(`product${i}`)
                valueProduct.setAttribute('id', `unit-price`)

                divQuantity.setAttribute('class', `col-md-3 product-detail`) 
                divQuantity.setAttribute('id', `quantity${[i]}`) 
                quantityInput.setAttribute('type', 'number') 
                quantityInput.setAttribute('id', `productQuantity${[i]}`) 
                quantityInput.setAttribute('value', `${product[i].quantity_product}`) 
                quantityInput.setAttribute('min', '1') 
                quantityInput.setAttribute('max', `${product[i].estoque}`) 
                quantityInput.classList.add("form-control")
        
                let price = product[i].price.toFixed([2])
                // price = price.toString().replace(".", ",")
                

                img.src = product[i].image
                titleProduct.innerHTML = "Produto"
                description.innerText = product[i].product_name
                titlePrice.innerHTML = "Preço: R$ "
                valueProduct.innerHTML = price
                titleQuantity.innerHTML = "Quantidade"
                
                
                html.get('.justify-content-md-center').appendChild(divImg)
                html.idGet(`img${[i]}`).appendChild(img)
                html.get('.justify-content-md-center').appendChild(divProductDetails)
                html.get('.justify-content-md-center').appendChild(divQuantity)
                html.idGet(`product${[i]}`).appendChild(titleProduct)
                html.idGet(`product${[i]}`).appendChild(description)
                html.idGet(`product${[i]}`).appendChild(titlePrice)
                html.get(`.titlePrice${[i]}`).appendChild(valueProduct)
                html.idGet(`quantity${[i]}`).appendChild(titleQuantity)
                html.idGet(`quantity${[i]}`).appendChild(quantityInput)

                /** Total value */
                
            }
        },

        cardForm(product){
            for(let i = 0; i < product.length; i++){
                const divItem = document.createElement('div')
                const span = document.createElement('span')
                const itemName = document.createElement('item')

                divItem.setAttribute('id', `Item${product[i].id_product}`)
                divItem.classList.add("listProducts")
                span.classList.add("price")
                span.setAttribute('id', `summary-price`)
                itemName.classList.add("item-name")
                itemName.setAttribute('id', `${product[i].id_product}`)

                let price2 = html.get(`.product${i}`).innerText
                let quantity = html.idGet(`productQuantity${[i]}`).value
                
                amount = (parseFloat(price2) * parseInt(quantity) + amount);
        
                
                console.log(price2)
                html.idGet('cart-total').innerText = 'R$ ' + amount.toFixed(2);
                html.idGet('summary-total').innerText = 'R$ ' + amount.toFixed(2);
                html.idGet('amount').value = amount.toFixed(2);
                // html.idGet('summary-price').innerText = 'R$ ' + price;
                // html.idGet('summary-quantity').innerText = product[i].quantity_product;

                console.log(document.getElementById(`productQuantity${[i]}`).value);

                span.innerHTML = "R$ " + price2.toString().replace(".", ",")
                itemName.innerHTML = product[i].product_name + " (x" + product[i].quantity_product + ")"
                
                html.get('.item').appendChild(divItem)
                html.idGet(`Item${product[i].id_product}`).appendChild(span)
                html.idGet(`Item${product[i].id_product}`).appendChild(itemName)

                html.idGet(`productQuantity0`).addEventListener('change', updatePrice, true);
            }
        }
    }

    list.create(product)
    list.cardForm(product)

    document.getElementById
}

function calcProducts(){

}

function loadCardForm() {
    const productCost = document.getElementById('amount').value;
    const productDescription = document.getElementById('product-description').innerText;
    const payButton = document.getElementById("form-checkout__submit");
    const validationErrorMessages= document.getElementById('validation-error-messages');

    const form = {
        id: "form-checkout",
        cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Nome impresso no cartão",
        },
        cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
        },
        cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
            style: {
                fontSize: "1rem"
            },
        },
        expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YYYY",
            style: {
                fontSize: "1rem"
            },
        },
        securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
            style: {
                fontSize: "1rem"
            },
        },
        installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
        },
        identificationType: {
            id: "form-checkout__identificationType",
        },
        identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número de identificação",
        },
        issuer: {
            id: "form-checkout__issuer",
            placeholder: "Orgão emissor",
        },
    };

    const cardForm = mercadopago.cardForm({
        amount: productCost,
        iframe: true,
        form,
        callbacks: {
            onFormMounted: error => {
                if (error)
                    return console.warn("Form Mounted handling error: ", error);
                console.log("Form mounted");
            },
            onSubmit: event => {
                event.preventDefault();
                document.getElementById("loading-message").style.display = "block";

                const {
                    paymentMethodId,
                    issuerId,
                    cardholderEmail: email,
                    amount,
                    token,
                    installments,
                    identificationNumber,
                    identificationType,
                } = cardForm.getCardFormData();

                fetch("/process_payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        issuerId,
                        paymentMethodId,
                        transactionAmount: Number(amount),
                        installments: Number(installments),
                        description: productDescription,
                        payer: {
                            email,
                            identification: {
                                type: identificationType,
                                number: identificationNumber,
                            },
                        },
                    }),
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(result => {
                        if(!result.hasOwnProperty("error_message")) {
                            document.getElementById("success-response").style.display = "block";
                            document.getElementById("payment-id").innerText = result.id;
                            document.getElementById("payment-status").innerText = result.status;
                            document.getElementById("payment-detail").innerText = result.detail;
                        } else {
                            document.getElementById("error-message").textContent = result.error_message;
                            document.getElementById("fail-response").style.display = "block";
                        }
                        
                        $('.container__payment').fadeOut(500);
                        setTimeout(() => { $('.container__result').show(500).fadeIn(); }, 500);
                    })
                    .catch(error => {
                        alert("Unexpected error\n"+JSON.stringify(error));
                    });
            },
            onFetching: (resource) => {
                console.log("Fetching resource: ", resource);
                payButton.setAttribute('disabled', true);
                return () => {
                    payButton.removeAttribute("disabled");
                };
            },
            onCardTokenReceived: (errorData, token) => {
                if (errorData && errorData.error.fieldErrors.length !== 0) {
                    errorData.error.fieldErrors.forEach(errorMessage => {
                        alert(errorMessage);
                    });
                }

                return token;
            },
            onValidityChange: (error, field) => {
                const input = document.getElementById(form[field].id);
                removeFieldErrorMessages(input, validationErrorMessages);
                addFieldErrorMessages(input, validationErrorMessages, error);
                enableOrDisablePayButton(validationErrorMessages, payButton);
            }
        },
    });
};

function removeFieldErrorMessages(input, validationErrorMessages) {
    Array.from(validationErrorMessages.children).forEach(child => {
        const shouldRemoveChild = child.id.includes(input.id);
        if (shouldRemoveChild) {
            validationErrorMessages.removeChild(child);
        }
    });
}

function addFieldErrorMessages(input, validationErrorMessages, error) {
    if (error) {
        input.classList.add('validation-error');
        error.forEach((e, index) => {
            const p = document.createElement('p');
            p.id = `${input.id}-${index}`;
            p.innerText = e.message;
            validationErrorMessages.appendChild(p);
        });
    } else {
        input.classList.remove('validation-error');
    }
}

function enableOrDisablePayButton(validationErrorMessages, payButton) {
    if (validationErrorMessages.children.length > 0) {
        payButton.setAttribute('disabled', true);
    } else {
        payButton.removeAttribute('disabled');
    }
}

// Handle transitions
document.getElementById('checkout-btn').addEventListener('click', function(){
    $('.container__cart').fadeOut(500);
    setTimeout(() => {
        loadCardForm();
        $('.container__payment').show(500).fadeIn();
    }, 500);
});

document.getElementById('go-back').addEventListener('click', function(){
    $('.container__payment').fadeOut(500);
    setTimeout(() => { $('.container__cart').show(500).fadeIn(); }, 500);
});

// Handle price update
function updatePrice(products){
    let amount = 0
    for(let i = 0; i < products.length; i++){
        let price2 = html.get(`.product${i}`).innerText
        let quantity = html.idGet(`productQuantity${[i]}`).value
             
        amount = (parseFloat(price2) * parseInt(quantity) + amount);

        console.log(amount)

        html.idGet('cart-total').innerHTML
         = 'R$ ' + amount.toFixed(2);
        html.idGet('summary-total').innerText = 'R$ ' + amount.toFixed(2);
        html.idGet('amount').value = amount.toFixed(2);
        // html.idGet(`product${i}`).innerText = amount
    }
    
    // document.getElementById('cart-total').innerText = '$ ' + amount;
    // document.getElementById('summary-price').innerText = '$ ' + unitPrice;
    // document.getElementById('summary-quantity').innerText = quantity;
    // document.getElementById('summary-total').innerText = '$ ' + amount;
    // document.getElementById('amount').value = amount;
};



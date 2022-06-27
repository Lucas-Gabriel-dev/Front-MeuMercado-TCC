const express = require('express')
const route = express.Router()
const mercadopago = require('mercadopago')

route.get('/', (req, res) => res.render("index", {page: 'home'}))
route.get('/home', (req, res) => res.render("index", {page: 'home'}))

route.get('/results/:productssearch', (req, res) => res.render("index", {page: 'results'}))
route.get('/results/:category', (req, res) => res.render("index", {page: 'results'}))

route.get('/products/:productsId', (req, res) => res.render("index", {page: 'detailProduct'}))
route.get('/register', (req, res) => res.render("register", {page: 'register'}))

/** User Account */
route.get('/login', (req, res) => res.render("login", {page: 'login'}))
route.get('/infoAccount_user', (req, res) => res.render("index", {page: 'user'}))

/*** Autenticação pagamento */
const mercadoPagoPublicKey = 'TEST-828b16e6-8b0a-4a16-a19d-5d120c357121';
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}

const mercadoPagoAccessToken = 'TEST-5004758886982052-061716-73b87337a380ceb386507e06bf3ee6a6-771343666';
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}

mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

route.get("/buyitens", function (req, res) {
    res.status(200).render("index", { page: 'buyitens' });
}); 
  

route.post("/process_payment", (req, res) => {
    const { body } = req;
    const { payer } = body;
    const paymentData = {
      transaction_amount: Number(body.transactionAmount),
      token: body.token,
      description: body.description,
      installments: Number(body.installments),
      payment_method_id: body.paymentMethodId,
      issuer_id: body.issuerId,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.docType,
          number: payer.identification.docNumber
        }
      }
    };
  
    mercadopago.payment.save(paymentData)
      .then(function(response) {
        const { response: data } = response;
  
        res.status(201).json({
          detail: data.status_detail,
          status: data.status,
          id: data.id
        });
      })
      .catch(function(error) {
        console.log(error);
        const { errorMessage, errorStatus }  = validateError(error);
        res.status(errorStatus).json({ error_message: errorMessage });
      });
});

function validateError(error) {
    let errorMessage = 'Unknown error cause';
    let errorStatus = 400;
  
    if(error.cause) {
      const sdkErrorMessage = error.cause[0].description;
      errorMessage = sdkErrorMessage || errorMessage;
  
      const sdkErrorStatus = error.status;
      errorStatus = sdkErrorStatus || errorStatus;
    }
  
    return { errorMessage, errorStatus };
}

/*--------------- */

route.get('/cart', (req, res) => res.render("cart", {page: 'cart'}))

/** Partner Account */
route.get('/partnerRegister', (req, res) => res.render("registerPartner", {page: 'registerPartner'}))
route.get('/partnerLogin', (req, res) => res.render("partnerLogin", {page: 'partnerLogin'}))

route.get('/myproducts:id',  (req, res) => res.render("myproducts", {page: 'myproducts'}))
route.get('/addProducts',  (req, res) => res.render("addProducts", {page: 'addProducts'}))


route.get('/upload',  (req, res) => res.render("index", {page: 'upload'}))



module.exports = route
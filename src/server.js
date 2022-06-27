const express = require('express')
const routes = require("./routes")
const path = require('path')
const cors = require('cors')

const https = require("https") 
const fs = require("fs")

const app = express();

app.use(cors())
app.use(express.json());

app.set('view engine', 'ejs')

app.use(express.static("public"))

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))

app.use(routes)

const options ={
    key:fs.readFileSync(path.join(__dirname,'./.cert/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'./.cert/cert.pem')) 
}

const sslserver = https.createServer(options,app)

sslserver.listen(4000, () => console.log("Server is running"));

// app.listen(4000, () => console.log("Server is running"));
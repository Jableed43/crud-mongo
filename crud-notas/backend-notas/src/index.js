"use strict"

const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const port = 3900

var url = "mongodb://localhost:27017/crud-mongo"

mongoose.Promise = global.Promise;

//Require route methods
var article_routes = require("./routes/article")

//Body parser analiza cuerpos a traves de url
app.use(bodyParser.urlencoded({extended: false}))

//Cualquier peticion se convierte en json
app.use(bodyParser.json())

//Activamos el cors para permitir las peticiones ajax y http desde front-end
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-Width, Content-type, Accept, Access-Control-Allow-Request-Method")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE")
    next();
})

app.use("/api", article_routes)

mongoose.set("strictQuery", false);
mongoose.connect(url, {useNewUrlParser: true}).then(()=> {
    console.log("Successful db connection");
    app.listen(port, ()=>{
        console.log("Port running at " + port)
    })
})
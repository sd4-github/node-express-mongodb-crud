const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const crudRouter = require("./routes/tutorial.routes");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
app.use(crudRouter);

//connect mongodb with nodejs
const uri = "mongodb+srv://meanCrud:crud123@cluster0.27lfz.mongodb.net/meanCrud?retryWrites=true&w=majority";

// simple route
app.get("/", (req,res)=>{
	res.json({message: "welcome to crud app!"});
});

mongoose.connect(uri, {useNewUrlParser:true})
.then(successMessage=>{
	console.log("connected to database!", successMessage);
})
.catch(err=>{
	console.log("not connected!",err);
})

// set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(	PORT, ()=>{
	console.log(`server is running on port ${PORT}`);
});


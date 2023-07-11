// const express=require('express');
// const cors=require('cors');
// const mongoose=require('mongoose');


// const app= express();
// const port = 3001;

// //middleware
// app.use(express.json());
// app.use(cors({
//     origin : "*"
  
// }));

// //connection url
// mongoose.connect("mongodb://127.0.0.1:27017/doctocare")
// //API

// app.get('/',(req,res) => res.status(200).json(
//     ["hii","hieh","eihie","eic","ehhco"]));
// app.listen(port, () => console.log('listing on the port',port));




const mongoose = require("mongoose");
 const express = require("express");
 const cors = require("cors");
 const bodyParser = require("body-parser");
 const createError = require("http-errors");
// Connecting MongoDB
async function mongoDbConnection() {
    
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/doctocare",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    6000
  );
}
mongoDbConnection().then(() => {
  console.log("MongoDB successfully connected.");
}),
  (error) => {
    console.log("Could not connected to database : " + err);
  };
  
 const userRoute = require ("./route/doctorroute");
 const cardioDept=require("./route/cardioroute");
 const dermoDept=require("./route/dermoroute");
//  const cardio=require("./route/cardioroute");
// const cardioExpressRoute = require("./route/cardioroute");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);

// CORS
app.use(cors());
// RESTful API root
app.use("/endpoint", userRoute);
app.use("/endpoint1",cardioDept);
app.use("/endpoint2",dermoDept);
// app.use("/cardio",cardio)
// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("PORT Connected on: " + port);
});
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
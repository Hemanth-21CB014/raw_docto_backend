const express = require("express");
const dermoExpressRoute = express.Router();
const cors = require("cors");
let dermoSchema = require("../model/dermomodel");
// CORS OPTIONS
var whitelist =["https://localhost:8100", "https://localhost:4000","https://localhost:3000"];
console.log("1")
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    console.log(whitelist[0]);
    corsOptions = {
      origin: "*",
      methods: "GET",//HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// console.log("2")
console.log(dermoExpressRoute)
console.log(corsOptionsDelegate)
// Get users
 dermoExpressRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    console.log(req);
    await dermoSchema.find()
      .then((result) => {
        console.log(result);
        res.json({
          data: result,
          // message: "Data successfully fetched!",
          // status: 200,
        });
      })
      .catch((err) => {
        console.log('in catch block')
        return next(err);
      });
  });
  module.exports=dermoExpressRoute ;
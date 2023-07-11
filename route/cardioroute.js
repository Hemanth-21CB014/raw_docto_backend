const express = require("express");
const cardioExpressRoute = express.Router();
const cors = require("cors");
let CardioSchema = require("../model/cardiomodel");
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
console.log("2")
console.log(cardioExpressRoute)
console.log(corsOptionsDelegate)
// Get users
 cardioExpressRoute
  .route("/", cors(corsOptionsDelegate))
  .get(async (req, res, next) => {
    console.log(req);
    await CardioSchema.find()
      .then((result) => {
        console.log('in then block'+result);
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
  module.exports=cardioExpressRoute ;
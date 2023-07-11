const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let dermoSchema = new Schema(
  {
    //image:{type:Blob},
    id:{type:Number},
    Name: {type: String},
    Exprience: {type: Number},
    Success:{type:Number},
    Dept:{type:String}
      },
  {collection: "dermo",},
);

module.exports = mongoose.model("DermoSchema",dermoSchema);
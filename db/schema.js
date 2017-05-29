var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var FoodItemSchema = new Schema({
  name: String,
  food_group: String,
  expirationDate: Date,
  comments: String
});

var UserSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  favorite_food: String,
  items: [FoodItemSchema]
});


var UserModel = mongoose.model("User", UserSchema);
var FoodItemModel = mongoose.model("Item", FoodItemSchema);

module.exports = {
  User: UserModel,
  Item: FoodItemModel
};

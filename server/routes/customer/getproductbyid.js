const express = require("express");
const { DBConnection } = require("../../assist/DBConnection");
const router = express.Router();

const db = DBConnection.connect();

let responseData = {
  message: "",
  data: [],
  hasError: false,
};
router.post("/", (req, res) => {
  let pid = req.body.pid;
  let id = req.body.id;

  const mainCommand = `SELECT t2.*, ROUND(AVG(t1.Value)) AS Rate, t3.Description AS OfferDescription, t3.Percentage AS OfferPercentage, t4.ID AS FavoriteID, t5.IsExist FROM ( SELECT * FROM rate ) t1 INNER JOIN( SELECT * FROM product ) t2 ON t1.ProductID = ${pid} AND t2.ID = ${pid} LEFT JOIN( SELECT * FROM offer ) t3 ON t3.ProductID = ${pid} AND t2.ID = ${pid} LEFT JOIN( SELECT * FROM favorite ) t4 ON t4.ProductID = ${pid} AND t4.CustomerID = (SELECT ID FROM customer WHERE UserID = ${id}) INNER JOIN( SELECT * FROM restaurant ) t5 ON t5.IsExist = 1 AND t5.ID = (SELECT RestaurantID FROM category WHERE ID = (SELECT CategoryID from product WHERE ID = ${pid}))`;

  db.query(mainCommand, (err, result) => {
    if (err) {
      printError(err.message, res);
      return;
    }
    if (result[0].IsExist === null) {      
      result[0] = {
        ID: 26,
        Name: "-------------------",
        Price: 0.0,
        Image: "-------------",
        Description: "-------------------",
        IsAvailable: 0,
        CreationDate: "------------",
        CategoryID: 0,
        Rate: 0,
        OfferDescription: null,
        OfferPercentage: null,
        FavoriteID: null,
        IsExist: null,
      };
    }
    let product = result[0];
    let percentage = product.OfferPercentage;
    let favoriteId = product.FavoriteID;
    let now = new Date();
    let creationDate = new Date(product.CreationDate);
    let elapsedWeeks = Math.abs(weeksBetween(now, creationDate));

    product.IsNew = elapsedWeeks <= 1 ? true : false;
    product.HasOffer = percentage === null ? false : true;
    product.IsFavorite = favoriteId === null ? false : true;
    delete product.FavoriteID;
    res.send(JSON.stringify(product));
  });
});

function printError(message, res) {
  responseData.message = message;
  responseData.hasError = true;
  res.send(responseData);
}

function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}
module.exports = router;

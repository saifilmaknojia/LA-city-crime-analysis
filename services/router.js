const express = require('express');
const router = new express.Router();
const totalCount = require('../db_apis/totalCount.js');
const rankCrimesDB = require('../db_apis/crimeType.js');
const rankWeaponDB = require('../db_apis/weaponType.js');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/').get(function (req, res){
    return res.render('../views/crimeData.ejs', {data: "", type: "", total: ""})
})

router.route('/rankCrimes')
  .post(async function get(req, res, next) {
    try {
      const context = {};
      let rows;
      context.type = req.body.type;
      context.ordering = req.body.ordering;
      if(req.body.ranking =="area_crime"){
        rows = await rankCrimesDB.find(context);
      } else{
        rows = await rankWeaponDB.find(context);
      }
      countAll = await totalCount.find(context);
      if (req.body.type && rows.length > 0) {
            return res.render('../views/crimeData.ejs', {data: rows, type: req.body.ranking, total: countAll})
        } else {
          res.status(404).end();
        }
    } catch (err) {
      next(err);
  }
   
  });
 
module.exports = router;


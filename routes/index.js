var express = require('express');
const { getERC20Balance } = require('../services');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/kairat-talantbekov/apitest', async function(req, res, next) {
  const wallet = req.query.wallet;
  const contract = req.query.contract;
  const balance = await getERC20Balance(contract, wallet);
  res.send({ balance: Number(balance) });
});

module.exports = router;

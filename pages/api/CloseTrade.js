
import selectUser from '../api/users/selectUser';
const ccxt = require ('ccxt');
const apiKey = selectUser().Key;
const apiSecret = selectUser().Secret;

let exchange = new ccxt.binanceusdm (
  {
    'apiKey': apiKey,
    'secret': apiSecret,
  })
  exchange.setSandboxMode(true);


export default async function closeTrade(req, res){
  const symbol = req.body.symbol
  const side = req.body.side
  const price = req.body.price
  const qty = req.body.quantity
  const params = {
    'reduceOnly':true
  }

if(price > 0){
  exchange.createLimitOrder (symbol, side, qty,price, params)
}else{
  exchange.createMarketOrder (symbol, side, qty, params)
}
  res.redirect("/");
}


import { sendUser } from '../api/users/selectUser';
const ccxt = require ('ccxt');
const apiKey = theUser.Key;
const apiSecret = theUser.Secret;

let exchange = new ccxt.binanceusdm (
  {
    'apiKey': apiKey,
    'secret': apiSecret,
  })
  exchange.setSandboxMode(true);


//Execute Trades

export default async function sendTrade(req,res) {
  const coin = req.body.coin + '/USDT';
  const trade = req.body.trade;
  const order = req.body.order;
  const qty = Number(req.body.quantity);
  const price =Number(req.body.price);
  const stopPrice = Number(req.body.stopPrice);
  const leverage = Number(req.body.leverage);
  const paramsStop = {
    'stopPrice':stopPrice
};
const params ={
  'type':'future',
  'leverage':leverage
};

await exchange.setLeverage (leverage,coin)

switch (order) {
  case "Market":
  exchange.createMarketOrder (coin, trade, qty, params)
    break;
  case "Limit":
  exchange.createLimitOrder (coin, trade, qty, price, params)
    break;
  case "Stop Market":
  exchange.createOrder (coin, 'STOP_MARKET', trade, qty,paramsStop)
    break;
  case "Stop Limit":
  exchange.createOrder (coin, trade, qty, price, paramsStop)
    break;
}
    res.redirect("/");

}

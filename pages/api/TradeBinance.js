
const ccxt = require ('ccxt');
import connectMongo from '../api/lib/connectMongo';
import User from '../models/userModel';


//Execute Trades

export default async function sendTrade(req,res) {
  const userID = req.body.userId;

  const selectedUser = await User.findById({_id:userID},'key secret');
  const {key,secret} = selectedUser;


  let exchange = new ccxt.binanceusdm (
    {
      'apiKey': key,
      'secret': secret,
      'enableRateLimit': true
    })

    if(userID === "630ce78c3cb9900d4e7c0c63"){
    exchange.setSandboxMode(true);
  }

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

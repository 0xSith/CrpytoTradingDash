
const ccxt = require ('ccxt');
import connectMongo from '../api/lib/connectMongo';
import User from '../models/userModel';



export default async function closeTrade(req, res){
  const userID = req.body.userId;

  const selectedUser = await User.findById({_id:userID},'key secret');
  const {key,secret} = selectedUser;


  let exchange = new ccxt.binanceusdm (
    {
      'apiKey': key,
      'secret': secret,
      'enableRateLimit': true
    })

    if(userID === "630d484f3e9aea5a9bd30210"){
    exchange.setSandboxMode(true);
  }


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

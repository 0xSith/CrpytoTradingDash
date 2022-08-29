const ccxt = require ('ccxt');
import connectMongo from '../api/lib/connectMongo';
import User from '../models/userModel';

export default async function getData(req,res){
  const userID = req.body.id;
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


  let accountBalances = await exchange.fetchBalance();
  let accountPositions = await exchange.fetchPositions();
  let streamedBTC = await exchange.fetchTicker('BTCUSDT');
  let streamedETH = await exchange.fetchTicker('ETHUSDT');
  let streamedLTC = await exchange.fetchTicker('LTCUSDT');
  const balance = accountBalances.info.availableBalance;
  let positionsRaw =[];
  let streamedCoins =[streamedBTC.last,streamedETH.last,streamedLTC.last];


  for(let i=0; i < accountPositions.length;i++){
    if(accountPositions[i].contracts > 0){
      positionsRaw.push(accountPositions[i].info);
    }
  }

  function selectProps(...props){
  return function(obj){
    const newObj = {};
    props.forEach(name =>{
      newObj[name] = obj[name];
    });

    return newObj;
  }
}

const positions = positionsRaw.map(selectProps("symbol", "leverage","positionAmt", "entryPrice","markPrice","liquidationPrice", "unRealizedProfit"));


  res.status(200).json({positions:positions, balance:balance, streamedCoins: streamedCoins});

}

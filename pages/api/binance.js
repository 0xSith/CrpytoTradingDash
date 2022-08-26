
const ccxt = require ('ccxt')


// Get account information

export default async function getAccountInfo(req,res){
if(req.body === ""){
res.status(200)
}else{
const apiKey =req.body.Key[1];
const apiSecret =req.body.Secret[1];

  let exchange = new ccxt.binanceusdm (
    {
      'apiKey': apiKey,
      'secret': apiSecret,
      'enableRateLimit': true
    })
    exchange.setSandboxMode(true);

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
}

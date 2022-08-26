import { useState, useEffect } from 'react';

export default function Trading(props){
  let multi = 0;
  const streamedCoins = props.streamedCoins;
  const coin = props.coin;
  const balance = props.balance;
  const [tradeType, setTradeType] = useState("");
  const [orderType, setOrderType] = useState("");
  const [posSize, setPosSize] = useState("");
  const [crypto, setCrypto] =useState("");
  const [stopPrice, setStopPrice]=useState("");
  const [cost, setCost] = useState(0);
  const [leverage,setLeverage] =useState(1);
  const [maxLev,setMaxLev] = useState(1);


  useEffect(() => {
    if(tradeType === "Buy"){
      document.getElementById("Buy").style.background = "green";
      document.getElementById("Buy").style.color = "white";
      document.getElementById("Sell").style.background = "";
      document.getElementById("Sell").style.color = "red";

    }
    else if(tradeType === "Sell"){
      document.getElementById("Sell").style.background = "red";
      document.getElementById("Sell").style.color = "white";
      document.getElementById("Buy").style.background = "";
      document.getElementById("Buy").style.color = "green";
    }
  },[tradeType])

  useEffect(() => {
    switch (orderType) {
    case "Market":
      document.getElementById("marketInput").disabled = false
      document.getElementById("limitInput").disabled = true
      document.getElementById("stopInput").disabled = true
      document.getElementById("limitInput").value = "Limit Price"
      document.getElementById("orderTypeMenu").innerHTML = orderType
      if(coin === "BTC"){
        setCrypto(streamedCoins[0])
      }else if(coin === "ETH"){
        setCrypto(streamedCoins[1])
      }else if(coin === "LTC"){
        setCrypto(streamedCoins[2])
      }
      setPosSize("")
      isButtonChecked()
      break;
    case "Limit":
      document.getElementById("marketInput").disabled = false
      document.getElementById("limitInput").disabled = false
      document.getElementById("stopInput").disabled = true
      document.getElementById("orderTypeMenu").innerHTML = orderType
      break;
    case "Stop Market":
    document.getElementById("marketInput").disabled = false
    document.getElementById("stopInput").disabled = false
    document.getElementById("limitInput").disabled = true
    document.getElementById("limitInput").value = "Limit Price"
    document.getElementById("orderTypeMenu").innerHTML = orderType
    if(coin === "BTC"){
      setCrypto(streamedCoins[0])
    }else if(coin === "ETH"){
      setCrypto(streamedCoins[1])
    }else if(coin === "LTC"){
      setCrypto(streamedCoins[2])
    }
    setPosSize("")
    isButtonChecked()
      break;
    case "Stop Limit":
    document.getElementById("marketInput").disabled = false
    document.getElementById("limitInput").disabled = false
    document.getElementById("stopInput").disabled = false
    document.getElementById("orderTypeMenu").innerHTML = orderType
      break;
    default:
      console.log('No matches for trade Type found');
  }
},[orderType])

useEffect(() => {
  document.getElementById("marketInput").value = posSize;
  setCost((posSize*crypto)/ leverage);
},[posSize])

useEffect(() => {
  setPosSize("");
  isButtonChecked();
},[crypto])

useEffect(() => {
  document.getElementById("costLabel").innerHTML = "Cost:$"+cost;
},[cost])

useEffect(() => {
  document.getElementById("leverageOutput").innerHTML = leverage;
  isButtonChecked();
},[leverage])


  function handleClickSize(){
    if(event.target.name === "btnradio"){
      multi = event.target.value;
    }
        setPosSize(balance * multi * leverage/crypto);
        setCost (balance * multi);
  }

  function handleChangeSize(){
    if(event.target.id === "marketInput"){
      setPosSize (event.target.value);
    }

    for(let i =1; i<5; i++){
      document.getElementById('btnradio'+i).checked = false;
    }
  }

  function isButtonChecked(){
    document.getElementById("leverageOutput").innerHTML = leverage;
    if(document.querySelector("[name=btnradio]").checked){
      handleClickSize();
    }else{
      handleChangeSize();
    }
  }

  function handleMaxLev(){
      if(coin === "BTC"){
        setMaxLev(25);
      }else if(coin === "ETH"){
        setMaxLev(100);
      }else if (coin === "LTC"){
        setMaxLev(75);
      }
  }

return(
  <div className="w-50 position-fixed end-0 border border-primary border-2 border-opacity-75 rounded TradingDiv p-5 mt-5">
      <div className="container gap-3 text-center">
        <div className="row">
        <h2 className="pb-4"> Account Balance: ${balance} </h2>
          <div className="col">
            <button className= "btn-lg px-5 mx-5 btn-outline-success btn" onClick={() => setTradeType(event.target.name)} name="Buy" id="Buy">Buy</button>
            </div>
            <div className="col">
            <button className="btn-outline-danger  btn-lg px-5 mx-5 btn" onClick={() => setTradeType(event.target.name)} name="Sell" id="Sell" > Sell </button>
          </div>
        </div>
      </div>
    <div className="container text-center border border-top-0 border-info border-opacity-25">
    <div className="row">
      <div className="col-6">
      <form className="orderForm">
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">QTY</span>
          <input type="text" className="form-control input-group-lg" placeholder="Quantity" id="marketInput" onChange={handleChangeSize} disabled />
          <span className="input-group-text input-group-sm">{coin}</span>
        </div>
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">Limit</span>
          <input type="text" className="form-control input-group-lg" placeholder="Limit Price" id="limitInput" onChange={() => setCrypto(event.target.value)} disabled />
          <span className="input-group-text input-group-sm">$</span>
        </div>
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">Stop</span>
          <input type="text" className="form-control input-group-lg" placeholder="Stop Price" id="stopInput" onChange={() => setStopPrice(event.target.value)} disabled />
          <span className="input-group-text input-group-sm">$</span>
        </div>
      </form>
        <div className="btn-group pb-3" role="group">
          <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={handleClickSize} value= "0.25" />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">25%</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={handleClickSize} value="0.5" />
          <label className="btn btn-outline-primary" htmlFor="btnradio2">50%</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={handleClickSize} value="0.75" />
          <label className="btn btn-outline-primary" htmlFor="btnradio3">75%</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={handleClickSize} value="1" />
          <label className="btn btn-outline-primary" htmlFor="btnradio4">100%</label>
        </div>
      </div>

        <div className="dropdown position-absolute end-0 p-5 orderSelector col-6">
          <button className="btn btn-secondary dropdown-toggle btn-lg" type="button" data-bs-toggle="dropdown" id="orderTypeMenu" >Trade</button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><button className="dropdown-item" type="button" onClick={() => setOrderType(event.target.name)} name="Market" >Market</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setOrderType(event.target.name)} name="Limit" >Limit</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setOrderType(event.target.name)} name="Stop Market" >Stop Market</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setOrderType(event.target.name)} name="Stop Limit" >Stop Limit</button></li>
          </ul>
        </div>
    <button className="btn btn-md btn-dark position-absolute end-0 w-25 executeTrade" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom4">Trade</button>
    <div className="offcanvas offcanvas-end offcanvasTrade text-bg-dark border border-light rounded" tabIndex="-1" id="offcanvasBottom4" data-bs-backdrop="false" >
    <form action="/api/TradeBinance" method="post">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasBottomLabel4">Execute Trade</h5>
        <input type="text" className="input-sm border border-light" name="coin" value={coin} readOnly />
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
    <div className="offcanvas-body">
      <div className="row">
        <div className = "p-3 input-group col">
          <span className="input-group-text " id="basic-addon1"><b>Trade Type:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={tradeType} name="trade" readOnly />
        </div>
        <div className = "p-3 input-group col">
          <span className="input-group-text" id="basic-addon1"><b>Quantity:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={posSize} name="quantity" readOnly />
        </div>
        <div className = "p-3 col input-group">
          <span className="input-group-text" id="basic-addon1"><b>Leverage:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={leverage} name="leverage" readOnly />
        </div>
      </div>
      <div className="row">
        <div className = "p-3 col input-group">
          <span className="input-group-text" id="basic-addon1"><b>Price:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={crypto} name="price" readOnly />
        </div>
        <div className = "p-3 col input-group">
          <span className="input-group-text" id="basic-addon1"><b>Order Type:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={orderType} name="order" readOnly />
        </div>
        <div className = "p-3 col input-group">
          <span className="input-group-text" id="basic-addon1"><b>Stop Loss:</b></span>
          <input type="text" className="input-group-sm border border-light" id="executeTrade" value={stopPrice} name="stopPrice" readOnly />
        </div>
      </div>
        <div className = "p-3">
          <button type="submit" className="btn btn-light btn-sm w-25" >Submit</button>
        </div>
    </div>
    </form>
    </div>
    <h4 className ="text-end pe-5 pb-4" id="costLabel">Cost:${cost}</h4>
    </div>
    </div>
    <form className="text-center pt-5">
    <label htmlFor="customRange3" className="form-label"><h4>Leverage</h4></label>
<input type="range" className="form-range" min="1" max ={maxLev} step="1" id="customRange3" onChange={() => setLeverage(event.target.valueAsNumber)} onMouseOver ={handleMaxLev} />
<output id="leverageOutput"></output>
</form>
  </div>
);
}

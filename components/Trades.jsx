//Declared variables are to be assigned from binance API

import { useState, useEffect } from 'react';


export default function Trades(props){

  const positions = props.positions;
  const user =props.user;
  const [symbol,setSymbol] = useState("");
  const [side,setSide] = useState("");

useEffect(() => {
document.getElementById("LimitorderTypeMenu").innerHTML = symbol;
document.getElementById("MarketorderTypeMenu").innerHTML = symbol;
},[symbol])

function handleClickRadio(){

  let multi = event.target.value;
  let id = "";

  if(event.target.name == "btnradioLimit"){
    id = "posSizeLimit";
  }

  if(event.target.name == "btnradioMarket"){
    id= "posSizeMarket";
  }

  positions.map((position) => {
    if(position.symbol == symbol){
     document.getElementById(id).value = multi * position.positionAmt;
   }
 });
}



  return(
    <div className="w-50 position-fixed start-0 bottom-0 border border-end-0 border-top-0 border-primary border-2 border-opacity-75 rounded TradesDiv text-center">
      <h4 className="form-label">Trades</h4>
      <div className="container tradePadding">


      {positions.map((position) =>{
        return(
        <div className="row" key = {position.symbol}>
          <div className="col">
            <h6>Position</h6>
            <p>{position.symbol}</p>
          </div>
          <div className="col">
            <h6>Lev</h6>
            <p>{position.leverage}</p>
          </div>
          <div className="col">
            <h6>Size</h6>
            <p>{position.positionAmt}</p>
          </div>
          <div className="col">
            <h6>Entry</h6>
            <p>${Math.round(position.entryPrice * 1000) / 1000}</p>
          </div>
          <div className="col">
            <h6>Mark</h6>
            <p>${Math.round(position.markPrice *1000) / 1000}</p>
          </div>
          <div className="col">
            <h6>Liq</h6>
            <p>${Math.round(position.liquidationPrice *1000)/1000}</p>
          </div>
          <div className="col">
            <h6>PnL</h6>
            <p>${Math.round(position.unRealizedProfit * 100) /1000}</p>
          </div>
        </div>
      )
      })}
      </div>


      <div className="container tradePadding">
        <div className="row">




          <div className="col">
            <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2">Limit Close</button>
            <div className="offcanvas offcanvas-bottom w-50 text-bg-dark border border-secondary rounded" tabIndex="-1" id="offcanvasBottom2" data-bs-backdrop="false" >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasBottomLabel2">Limit Close</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
              </div>



              <form action="/api/CloseTrade" method="post">
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle btn" type="button" data-bs-toggle="dropdown" id="LimitorderTypeMenu" ></button>
                <ul className="dropdown-menu dropdown-menu-light">
                {positions.map((position) => {
                  return (<li key={position.symbol}><button className="dropdown-item" type="button" onClick={() => {
                    setSymbol(position.symbol)
                    position.positionAmt < 0 ? setSide("Buy"): setSide("Sell")
                  }}>{position.symbol} {position.positionAmt < 0 ? "SHORT":"LONG"}</button></li>)
                })}
                </ul>
                <input type="text" name="symbol" defaultValue={symbol} hidden />
                <input type="text" name="side" defaultValue={side} hidden />
                <input type ="text" name="userId" defaultValue={user} hidden />
              </div>
              <div className="offcanvas-body">
                <div className = "p-3">
                  <input type="number" className="input-group-lg border border-secondary rounded" placeholder="Close Price" id="closeLimit" name="price" />
                </div>
                <div className = "p-3">
                  <input type="number" className="input-group-lg border border-secondary rounded" placeholder="Position Size" step="0.001" id="posSizeLimit" name="quantity" />
                </div>
                <div className="btn-group pb-3" role="group">
                  <input type="radio" className="btn-check" name="btnradioLimit" id="btnradioLimit1" autoComplete="off" onChange={handleClickRadio} value= "0.25" />
                  <label className="btn btn-outline-light" htmlFor="btnradioLimit1">25%</label>

                  <input type="radio" className="btn-check" name="btnradioLimit" id="btnradioLimit2" autoComplete="off" onChange={handleClickRadio} value="0.5" />
                  <label className="btn btn-outline-light" htmlFor="btnradioLimit2">50%</label>

                  <input type="radio" className="btn-check" name="btnradioLimit" id="btnradioLimit3" autoComplete="off" onChange={handleClickRadio} value="0.75" />
                  <label className="btn btn-outline-light" htmlFor="btnradioLimit3">75%</label>

                  <input type="radio" className="btn-check" name="btnradioLimit" id="btnradioLimit4" autoComplete="off" onChange={handleClickRadio} value="1" />
                  <label className="btn btn-outline-light" htmlFor="btnradioLimit4">100%</label>
                </div>
                <div className = "p-3">
                  <button type="submit" className="btn btn-light btn-sm w-25">Submit</button>
                </div>
              </div>
              </form>
            </div>
          </div>



          <div className ="col">
            <button className="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3">Market Close</button>
            <div className="offcanvas offcanvas-bottom w-50 text-bg-info border border-primary rounded" tabIndex="-1" id="offcanvasBottom3" data-bs-backdrop="false" >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasBottomLabel3">Market Close</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
              </div>
              <div className="offcanvas-body">



                <form action="/api/CloseTrade" method="post">
                <div className="dropdown p-1">
                  <button className="btn btn-dark dropdown-toggle btn" type="button" data-bs-toggle="dropdown" id="MarketorderTypeMenu" ></button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                  {positions.map((position) => {
                    return (<li key={position.symbol}><button className="dropdown-item" type="button" onClick={() => {
                      setSymbol(position.symbol)
                      position.positionAmt < 0 ? setSide("Buy"): setSide("Sell")
                    }}>{position.symbol} {position.positionAmt < 0 ? "SHORT":"LONG"}</button></li>)
                  })}
                  </ul>
                  <input type="text" name="symbol" defaultValue={symbol} hidden />
                  <input type="text" name="side" defaultValue={side} hidden />
                  <input type ="text" name="userId" defaultValue={user} hidden />
                </div>
                <div className = "p-3">
                  <input type="number" className="input-group-lg border border-primary rounded" placeholder="Position Size" id="posSizeMarket" step="0.001" name="quantity" />
                </div>


                <div className="btn-group pb-3" role="group">
                  <input type="radio" className="btn-check" name="btnradioMarket" id="btnradioMarket1" autoComplete="off" onChange={handleClickRadio}  value= "0.25" />
                  <label className="btn btn-outline-dark" htmlFor="btnradioMarket1">25%</label>

                  <input type="radio" className="btn-check" name="btnradioMarket" id="btnradioMarket2" autoComplete="off" onChange={handleClickRadio} value="0.5" />
                  <label className="btn btn-outline-dark" htmlFor="btnradioMarket2">50%</label>

                  <input type="radio" className="btn-check" name="btnradioMarket" id="btnradioMarket3" autoComplete="off" onChange={handleClickRadio} value="0.75" />
                  <label className="btn btn-outline-dark" htmlFor="btnradioMarket3">75%</label>

                  <input type="radio" className="btn-check" name="btnradioMarket" id="btnradioMarket4" autoComplete="off" onChange={handleClickRadio} value="1" />
                  <label className="btn btn-outline-dark" htmlFor="btnradioMarket4">100%</label>
                </div>


                <div className = "p-3">
                  <button type="submit" className="btn btn-dark btn-sm w-25" >Submit</button>
                </div>
                </form>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

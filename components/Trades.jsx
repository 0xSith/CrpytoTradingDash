//Declared variables are to be assigned from binance API


export default function Trades(){

  const position ="Long ETH/USD";
  const entryPrice="1000";
  const liqPrice="5000";
  const markPrice="1200";
  const posPNL="-200";


  return(
    <div className="w-50 position-fixed start-0 bottom-0 border border-end-0 border-top-0 border-primary border-2 border-opacity-75 rounded TradesDiv text-center">
      <h4 className="form-label">Trades</h4>
      <div className="container tradePadding">
        <div className="row">
          <div className="col">
            <h6>Position</h6>
            <p>{position}</p>
          </div>
          <div className="col">
            <h6>Entry Price</h6>
            <p>${entryPrice}</p>
          </div>
          <div className="col">
            <h6>Liquidation Price</h6>
            <p>${liqPrice}</p>
          </div>
          <div className="col">
            <h6>Market Price</h6>
            <p>${markPrice}</p>
          </div>
          <div className="col">
            <h6>Position PnL</h6>
            <p>${posPNL}</p>
          </div>
        </div>
      </div>
      <form>
      <div className="container tradePadding">
        <div className="row">
          <div className="col">
            <button class="btn btn-primary">Take Profit/StopLoss</button>
          </div>
          <div className="col">
            <button class="btn btn-dark">Limit Close</button>
          </div>
          <div className ="col">
            <button class="btn btn-info">Market Close</button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

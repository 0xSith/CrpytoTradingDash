

export default function Trading(){
  const coin = "";
return(
  <div className="w-50 position-fixed end-0 border border-primary border-2 border-opacity-75 rounded TradingDiv p-5 mt-5">
      <div className="container gap-3 text-center">
        <div className="row">
          <div className="col">
            <button className="btn btn-outline-success btn-lg px-5 mx-5"> Buy/Long </button>
            </div>
            <div className="col">
            <button className="btn btn-outline-danger btn-lg px-5 mx-5"> Sell/Short </button>
          </div>
        </div>
      </div>
    <div className="container text-center border border-top-0 border-info border-opacity-25">
    <div className="row">
      <div className="col-6">
      <form className="orderForm">
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">QTY</span>
          <input type="text" className="form-control input-group-lg" placeholder="Quantity" />
          <span className="input-group-text input-group-sm">{coin}</span>
        </div>
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">Limit</span>
          <input type="text" className="form-control input-group-lg" placeholder="Limit Price" />
          <span className="input-group-text input-group-sm">$</span>
        </div>
        <div className="position-relative p-2 input-group">
          <span className="input-group-text input-group-md">Stop</span>
          <input type="text" className="form-control input-group-lg" placeholder="Stop Price" />
          <span className="input-group-text input-group-sm">$</span>
        </div>
      </form>
      </div>

        <div className="dropdown position-absolute end-0 p-5 orderSelector col-6">
          <button className="btn btn-secondary dropdown-toggle btn-lg" type="button" data-bs-toggle="dropdown">Trade</button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><button className="dropdown-item" type="button">Market</button></li>
            <li><button className="dropdown-item" type="button">Limit</button></li>
            <li><button className="dropdown-item" type="button">Stop Market</button></li>
            <li><button className="dropdown-item" type="button">Stop Limit</button></li>
          </ul>
        </div>
    <button className="btn btn-md btn-dark position-absolute end-0 w-25 executeTrade">Trade</button>
    </div>
    </div>
    <form className="text-center pt-5">
    <label for="customRange3" class="form-label"><h4>Leverage</h4></label>
<input type="range" class="form-range" min="1" max="100" step="0.5" id="customRange3" />
<output>25x</output>
</form>
  </div>
);
}

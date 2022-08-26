

export default function Coins(props){

  let coin = ["BTC","ETH","LTC"];

 function coinSelected(){
   props.setCoin(event.target.id);
  }

  return(
    <div className="w-50 position-fixed start-0 border border-end-0 border-primary border-2 border-opacity-75 rounded CoinDiv p-5 mt-5">
    <label htmlFor="exampleDataList" className="form-label"><h5 className="text-center"> Coins </h5></label>
      <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
      <datalist id="datalistOptions">
      <option value="BTC/USD" />
      <option value="ETH/USD" />
      <option value="LTC/USD" />
      <option value="" />
      <option value="" />
      </datalist>
    <div className="btn-group-vertical gap-2 pb-4 border border-secondary border-top-0 border-end-0 mt-5 ps-3" role="group">
    <input type="radio" className="btn-check" name="coinRadio" id={coin[0]} autoComplete="off" onChange={coinSelected} />
  <label className="btn btn-outline-danger" htmlFor={coin[0]}>{coin[0]}/USDT</label>
  <input type="radio" className="btn-check" name="coinRadio" id={coin[1]} autoComplete="off" onChange={coinSelected} />
  <label className="btn btn-outline-danger" htmlFor={coin[1]}>{coin[1]}/USDT</label>
  <input type="radio" className="btn-check" name="coinRadio" id={coin[2]} autoComplete="off" onChange={coinSelected} />
  <label className="btn btn-outline-danger" htmlFor={coin[2]}>{coin[2]}/USDT</label>
    </div>
  </div>
  );
}

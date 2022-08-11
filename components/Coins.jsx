

export default function Coins(){
  return(
    <div className="w-50 position-fixed start-0 border border-end-0 border-primary border-2 border-opacity-75 rounded CoinDiv p-5 mt-5">
    <label for="exampleDataList" class="form-label"><h5 className="text-center"> Coins </h5></label>
      <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
      <datalist id="datalistOptions">
      <option value="BTC/USD" />
      <option value="ETH/USD" />
      <option value="LTC/USD" />
      <option value="" />
      <option value="" />
      </datalist>
    <ul className="border border-secondary border-top-0 border-end-0 mt-5">
    <a href="#"><h5>BTC/USD</h5></a>
    <a href="#"><h5>ETH/USD</h5></a>
    <a href="#"><h5>LTC/USD</h5></a>
    </ul>
    </div>
  );
}

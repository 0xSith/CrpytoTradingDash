import { useState, useEffect } from 'react';
import Header from "../components/header";
import Coins from "../components/Coins";
import Trades from "../components/Trades";
import Trading from "../components/Trading";
import connectMongo from './api/lib/connectMongo';
import User from './api/models/userModel';
const ccxt = require ('ccxt');



export default function HomePage(users) {
const usersArray = Object.values(users);

const [coin, setCoin] = useState("");
const [balance, setBalance] = useState("");
const [positions, setPositions] =useState([]);
const [streamedCoins, setStreamedCoins] =useState([]);
const [user,setUser] = useState("");

useEffect(()=>{
        import("bootstrap/dist/js/bootstrap");
},[])

async function fetchData(){
const response = await fetch("/api/binanceData", {
    method: "POST",
    body: JSON.stringify({
        id: user
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
const data = await response.json();

  setBalance(Math.floor(data.balance));
  setPositions(data.positions);
  setStreamedCoins(data.streamedCoins);
}

if(user.length > 0){
fetchData();
}

return (
  <div>
    <Header usersProp={usersArray} setUser={setUser} />
    <Coins setCoin ={setCoin}  />
    <Trades positions={positions} user={user} />
    <Trading coin={coin} balance={balance} streamedCoins={streamedCoins} user={user} />
  </div>
);
}


export async function getServerSideProps() {

  await connectMongo();
  const users = await User.find({},'username _id');

  return {
    props: {
      allUsers: JSON.parse(JSON.stringify(users)),
    },
  };
}

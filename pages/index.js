import { useState, useEffect } from 'react';
import Header from "../components/header";
import Coins from "../components/Coins";
import Trades from "../components/Trades";
import Trading from "../components/Trading";
import connectMongo from '../utils/connectMongo';
import User from '../models/userModel';



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
const response = await fetch('http://localhost:3000/api/binance')
const data = await response.json();

  setBalance(Math.floor(data.balance));
  setPositions(data.positions);
  setStreamedCoins(data.streamedCoins);
}

fetchData();

return (
  <div>
    <Header usersProp={usersArray} setUser={setUser} />
    <Coins setCoin ={setCoin} />
    <Trades positions={positions} />
    <Trading coin={coin} balance={balance} streamedCoins={streamedCoins} />
  </div>
);
}


export async function getServerSideProps() {

  await connectMongo();
  const users = await User.find();

  return {
    props: {
      allUsers: JSON.parse(JSON.stringify(users)),
    },
  };
}

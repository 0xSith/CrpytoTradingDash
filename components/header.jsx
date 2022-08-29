import Image from "next/image";
import logoPic from "../public/images/0x.png";
import { useState, useEffect } from 'react';


export default function Header(props) {
const users = props.usersProp[0];
const listUsers = users.map((user) => {

  return (
    <li className="nav-item">
    <input type="radio" className="btn-check" onClick={handleUserSelect} id={user._id} autoComplete="off" name="userID" />
    <label className="btn btn-outline-light border-start-0 w-100 border-end-0 rounded-0 border-opacity-25" htmlFor={user._id} >{user.username}</label>
  </li>
)})

function handleUserSelect(){
props.setUser(event.target.id);
}

  return (
  <nav className="navbar navbar-dark bg-dark mb-5 headerNav">
  <div className="container-fluid">
  <Image src={logoPic} alt="0x Logo" width={50} height={50} />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <div className="btn-group-vertical w-100 gap-2 pb-4" role="group">
      <form className="w-100" action="/api/binance" method="post" >
      {listUsers}
      </form>
      </div>
      <form className="d-flex" role="search" action="/api/users/add" method="post">
        <input className="form-control me-2" type="input" placeholder="Username" name="username" required />
        <input className="form-control me-2" type="input" placeholder="Key" name="key" required  />
        <input className="form-control me-2" type="input" placeholder="Secret" name="secret" required  />
        <button className="btn btn-outline-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</nav>
);
}

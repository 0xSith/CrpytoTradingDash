import Image from "next/image";
import logoPic from "../public/images/0x.png";



export default function Header() {
  return (
  <nav class="navbar navbar-dark bg-dark mb-5">
  <div class="container-fluid">
  <Image src={logoPic} alt="0x Logo" width={50} height={50} />
  <h2> Account Balance:</h2>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#">User 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">User 2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">User 3</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="input" placeholder="Username" />
        <input class="form-control me-2" type="input" placeholder="API Key"  />
        <button class="btn btn-outline-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
</nav>
);
}

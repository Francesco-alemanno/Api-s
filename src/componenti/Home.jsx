import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";

export default function Home() {
  const navTo=useNavigate()
  function handleLogout(){
    localStorage.removeItem('loggato')
navTo('/login')
  }
  return (
    <>
      <h1>Click on your favorite Api!</h1>
      <ul>
        <li>
          <Link to={"/searchWord"}>Dictionary</Link>
        </li>
        <li>
        <Link to={'/pokemon'}>Pokemon</Link>  
        </li>
      </ul>
      <p onClick={handleLogout}>Logout</p>
    </>
  );
}

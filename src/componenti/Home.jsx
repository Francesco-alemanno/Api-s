import { Link } from "react-router-dom";
import "../css/home.css";

export default function Home() {
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
    </>
  );
}

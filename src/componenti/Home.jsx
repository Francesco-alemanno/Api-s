import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Click on your favorite Api!</h1>

      <Link to={'/searchWord'}>Dictionary</Link>     

    </>
  );
}

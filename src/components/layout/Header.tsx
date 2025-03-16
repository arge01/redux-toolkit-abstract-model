import { Link } from "react-router-dom";

function Header() {
  return (
    <ul className="flex gap-2">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}

export default Header;

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul className="nav-bar">
        <li>
          <Link to="/home" className="nav-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/housinginfo" className="nav-item">
            Housing
          </Link>
        </li>
        <li>
          <Link to="/listings" className="nav-item">
            Listings
          </Link>
        </li>
        <li>
          <Link to="/messageboard" className="nav-item">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="nav-item">
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-item">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

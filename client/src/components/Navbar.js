import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const icon = require('../assets/icon.png');

export default function Navbar() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  return (
    <nav>
      <ul className="nav-bar">
        <li>
          <Link to="/home" className="nav-item">
            <img
              src={icon}
              style={{ width: 30, marginRight: 5, borderRadius: 10 }}
              alt="icon"
            />
            Sublettor
          </Link>
        </li>
        {token && (
          <>
            <li className="right">
              <Link to="/profile" className="nav-item">
                Profile
              </Link>
            </li>
            <li className="right">
              <Link to="/messageboard" className="nav-item">
                Messages
              </Link>
            </li>
            <li className="right">
              <Link to="/notifications" className="nav-item">
                Notifications
              </Link>
            </li>
            <li className="right">
              <Link to="/housinginfo" className="nav-item">
                Housing
              </Link>
            </li>
            <li className="right">
              <Link to="/listings" className="nav-item">
                Listings
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

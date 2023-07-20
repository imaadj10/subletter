
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <ul className='nav-bar'>
                <li>
                    <Link to='/main' className='nav-item'>Home</Link>
                </li>
            </ul>
        </nav>
    )
}
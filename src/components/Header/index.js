import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="nav-mobile-menu">
          <li className="nav-mobile-menu-item">
            <Link to="/" className="nav-link">
              <AiFillHome className="mobile-menu-item-icon" />
            </Link>
          </li>
          <li className="nav-mobile-menu-item">
            <Link to="/jobs" className="nav-link">
              <MdWork className="mobile-menu-item-icon" />
            </Link>
          </li>
          <li className="nav-mobile-menu-item">
            <button
              type="button"
              className="nav-mobile-logout-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="mobile-menu-item-icon" />
            </button>
          </li>
        </ul>
        <ul className="nav-laptop-menu">
          <li className="nav-laptop-menu-item">
            <Link to="/" className="nav-link">
              <p className="laptop-menu-item-text">Home</p>
            </Link>
          </li>
          <li className="nav-laptop-menu-item">
            <Link to="/jobs" className="nav-link">
              <p className="laptop-menu-item-text">Jobs</p>
            </Link>
          </li>
        </ul>
        <button
          className="nav-laptop-logout-btn"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import logo from '../image/logos.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const userId = localStorage.getItem('userId')
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  if(!localStorage.getItem('user_token')){
    return
  }
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles.orgName}>
            <Link to = '/'>
              Academic Tinder
            </Link>
          </li>
          <li><Link to="/">Home</Link></li>
          <li><Link to='/courses'>Course</Link></li>
          <li><Link to='/studybuddy'>Study Buddy</Link></li>
          <li><Link to="/suggestedprojects">Projects</Link></li>
          <li><Link to="/addcourse">Add Course</Link></li>
          <li><Link to="/abouts">About us</Link></li>
          <li className={styles.profile}>
            <div className={styles.profileContainer} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUserCircle} className={styles.profileIcon} />
              {username}
              <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className={styles.dropdownIcon} />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link className={styles.dropdownItem} to={`userdetail/${userId}`}>Profile Information</Link>
                <a href="#" onClick={handleSignout} className={styles.dropdownItem}>Signout</a>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

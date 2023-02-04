import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";

import './Navigation.css'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

 
  return (
    <>
    <div className="dropdownContainer">
      <button  className="dropButton" onClick={openMenu}>
      
        <i className="fas fa-user-circle" />
        
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <NavLink to='/groups' className="innerText">Groups</NavLink>
        <NavLink to='/events' className="innerText">Events</NavLink>
        <NavLink to='/' className="innerText">Home</NavLink>
        <li><p className="innerText">{user.email}</p></li>

        <li>
          <button className='logOut' onClick={logout}>Log Out</button>
        </li>
       
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
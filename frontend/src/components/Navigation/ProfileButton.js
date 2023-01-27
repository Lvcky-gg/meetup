import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

function ProfileButton({ user }) {
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
  };

  
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
  return (
    <>
    <div className="dropdownContainer">
      <button  className="dropButton" onClick={openMenu}>
      
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {/* <div className="dropdownContainer"> */}
        <li><p className="innerText">{user.username}</p></li>
        <li><p className="innerText">{user.email}</p></li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
        {/* </div> */}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
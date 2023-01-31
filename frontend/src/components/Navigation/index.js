import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import meetUpLogo from './meetup-logo-1.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let hideBar = "navContainer"

  let sessionLinks;
 
  if (sessionUser) {
  
    sessionLinks = (
      <li >
        <ProfileButton  user={sessionUser} />
      </li>
    );
    
  } else {
    sessionLinks = (
      <li className="modalButtonsUse">
      <OpenModalButton
      
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />
      <NavLink to="/signup">Sign Up</NavLink>
    </li>
    );
    hideBar = "navContainerHidden"
  }

  return (
    <ul className={hideBar}>
      <li>
        <NavLink exact to="/"><img src={meetUpLogo} alt="Home"></img></NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
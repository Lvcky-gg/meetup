import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import meetUpLogo from './PACKAGE_Artboard_1_copy_4.png';
import { useHistory } from 'react-router-dom';


function Navigation({ isLoaded }){
  let sessionUser = useSelector(state => state.session.user);
  let hideBar = "navContainer";
  const history = useHistory()

  // const onDemoClick=()=>{
  //   sessionUser= {}
  // }

  const onClick = () => {
    history.push('/')

  }

  let sessionLinks;
 
  if (sessionUser) {
    console.log(sessionUser)
  
    sessionLinks = (
      <li >
        <ProfileButton  user={sessionUser} />
      </li>
    );
    
  } else {
    sessionLinks = (
      <li className="modalButtonsUse">
        <button

        >
          Demo User
        </button>
      <OpenModalButton
      
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
        onClick={onClick}
      />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          onClick={onClick}
        />
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
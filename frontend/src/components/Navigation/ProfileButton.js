

import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
console.log(user)
  const ulClassName = "profile-dropdown";

  return (
    <>
      <button>
        <i className="fa-solid fa-laptop-code" />
      </button>
      <ul className="profile-dropdown">
        <li>{user.userName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
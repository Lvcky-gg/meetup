import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import Logo from './PACKAGE_Artboard_1_copy_3.png';
import { useEffect } from 'react';
import './LoginForm.css';


function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false)
  const { closeModal } = useModal();


  if (sessionUser) 

  return (
    <Redirect to="/" />
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit)
   
    return dispatch(sessionActions.login({ credential, password }))
    .then(()=>closeModal())
      // .then((data)=>data.id ? closeModal:(setErrors(["Password or Credential is incorrect"])))
      
      .catch(
        async (res) => {
          const data = await res.json();

          if (data && data.message) setErrors([data.message]);
        }
      );
    
  };

  return (
   
    <div className="loginFomrHolder">
    <img src={Logo} alt='img' className="loginFomr"></img>
    <form  className='loginForm' onSubmit={handleSubmit}>

      <div>
      <label>
        Username or Email

      </label>
      <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div>
      <label>
        Password
       
      </label>
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
      {
        submit &&   <ul>
        {errors.map((error, idx) => <li className="validation" key={idx}>{error}</li>)}
      </ul>
      }
    </form>
    </div>
  );
}

export default LoginFormModal;
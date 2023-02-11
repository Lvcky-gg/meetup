import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

import './signup.css'

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false)
  const { closeModal } = useModal();




  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit)
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          setErrors([])
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    setErrors([])
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className='signupForm' onSubmit={handleSubmit}>

      <div>
      <label>
        First Name
      </label>
      <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
      <label>
        Last Name
      </label>
      <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
      <label>
        Email
      </label>
      <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
      <label>
        Username
      </label>
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <div>
      <label>
        Confirm Password
      </label>
      <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div>
      <button type="submit">Sign Up</button>
      </div>
      <div>
      <ul>
        {submit && errors.map((error, idx) => <li className="validation" key={idx}>{error}</li>)}
      </ul>
      </div>
    </form>
  );
}

export default SignupFormModal;
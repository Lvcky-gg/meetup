import React, { useState } from 'react';
import * as groupActions from '../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { createGroup } from '../../store/groups';
import { useHistory } from 'react-router-dom';
import { getMyGroups } from '../../store/groups';
import { useEffect } from 'react';


function CreateGroupModal() {
  const history = useHistory()
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');
  const [bool, setBool] = useState(true);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const organizerId =sessionUser.id

//   if (sessionUser) return (
//     <Redirect to="/groups" />
//   );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    
    return createGroup({
      name,
      about,
      type,
      bool,
      city, 
      state,
      organizerId
    })(dispatch)
    // return dispatch(createGroup({ name, about, city, state, type, bool}))
      .then(closeModal)
      .then(getMyGroups(dispatch))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
      
  };

  return (
    <form  className='loginForm' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      
      <label>
        name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        about
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </label>
      <label>
        city
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        state
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
    <select
    name='type'
    onChange={(e) => setType(e.target.value)}
    value={type}>
         <option value='' disabled>Select Event Type</option>
         <option value='Online'>Online</option>
         <option value='In Person'>In Person</option>

    </select>
    <select
    name='bool'
    onChange={(e) => setBool(e.target.value)}
    value={bool}>
         <option value='' disabled>Select Private or Public Event</option>
         <option value={true}>Private</option>
         <option value={false}>Public</option>

    </select>
      <button type="submit">Log In</button>
    </form>
  );
}

export default CreateGroupModal;
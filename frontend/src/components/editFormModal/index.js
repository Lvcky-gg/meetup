import React, { useState } from 'react';
import * as groupActions from '../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { editGroup } from '../../store/groups';
import { useHistory } from 'react-router-dom';
import { getMyGroups } from '../../store/groups';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificGroup } from '../../store/groups';
import Logo from '../LoginFormModal/PACKAGE_Artboard_1_copy_3.png'

function EditGroupModal({Group, groupId}) {
    const USstates = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  const history = useHistory()
  const dispatch = useDispatch();
 

  const [name, setName] = useState(Group.name);
  const [about, setAbout] = useState(Group.about);
  const [city, setCity] = useState(Group.city);
  const [state, setState] = useState(Group.state);
  const [type, setType] = useState(Group.type);
  const [bool, setBool] = useState(Group.bool);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
 

useEffect(()=> {
  const validationErrors = [];
  if(name.length > 60)validationErrors.push('Name must be 60 characters or less')
  if(about.length < 50)validationErrors.push('About must be 50 characters or more')
  setErrors(validationErrors)
    getMyGroups(dispatch)
  }, [dispatch, name, about])

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit)
    if(!errors.length){
    return editGroup({
      name,
      about,
      type,
      bool,
      city, 
      state
    }, +groupId)(dispatch)
    // return dispatch(createGroup({ name, about, city, state, type, bool}))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
      }   
  };

  return (
    <div className="createGroupModalContainer">
      <img src={Logo} alt="photo"></img>
    <form  className='createFormModal' onSubmit={handleSubmit}>

      <div>
      <label>
        name
       
      </label>
      <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
        <div>
      <label>
        about
      </label>
      <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </div>
      <div>
      <label>
        city
      </label>
      <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
      <label>state</label>
      <select
      name="state "
      onChange={(e) => setState(e.target.value)}
       >
        <option value='' disabled>Select a State</option>
        {
       USstates.map(state=>(
          <option key={state} value={state}>{state}</option>
        ))
      }
      </select>
      </div>
     <div>
    <select
    name='type'
    onChange={(e) => setType(e.target.value)}
    value={type}>
         <option value='' disabled>Select Event Type</option>
         <option value='Online'>Online</option>
         <option value='In Person'>In Person</option>

    </select>
    </div>
    <div>
    <select
    name='bool'
    onChange={(e) => setBool(e.target.value)}
    value={bool}>
         <option value='' disabled>Select Private or Public Event</option>
         <option value={true}>Private</option>
         <option value={false}>Public</option>

    </select>
    </div>
    <div>
      <button type="submit">Submit</button>
      </div>
      <div>
      <ul className="validation">
        {
          submit && 
          errors.map((error, idx) => <li key={idx}>{`${error}`}</li>)
        }
      </ul>
      </div>
    </form>
    </div>
  );
}

export default EditGroupModal;
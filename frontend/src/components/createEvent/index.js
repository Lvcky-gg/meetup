import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSpecificEvent } from '../../store/specificEvent';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { getSpecificGroup } from '../../store/specificGroup';
import { getMyEvents } from '../../store/events';
import { useEffect } from 'react';
import Logo from '../LoginFormModal/PACKAGE_Artboard_1_copy_3.png'
import { getEventsForGroup } from '../../store/specificEvent';


function CreateEventModal({groupId}) {


 const allEvents = useSelector(state=>state.events.Events);

  const history = useHistory()
  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [venue, setVenue] = useState(0);
  const [price, setPrice] = useState(0.00);
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const myEvents = useSelector(state=>state.eventsForGroup.Events)





useEffect(()=> {
    getEventsForGroup(+groupId)(dispatch)

}, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    
    return createSpecificEvent(+groupId,{
    venue,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,

    })(dispatch)
      .then(closeModal)
      .then(getEventsForGroup(+groupId)(dispatch))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
      
  };

  return (
    <div className="createGroupModalContainer">
      <img src={Logo} alt="photo"></img>
    <form  className='createFormModal' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
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
    <div>
        <label>description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
            
    </div>
    <div>
        <label>capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        /> 
            
    </div>
    <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          min="0.00"
          step="0.01"
          presicion={2}  
          onChange={(e) => setPrice(e.target.value)}
          required
        /> 
            
    </div>
    <div>
        <label>Venue</label>
        <input
          type="number"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
         
        /> 
            
    </div>
    <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
         
        /> 
            
    </div>
    <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
         
        /> 
            
    </div>
    <label>Type</label>
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
      <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
}

export default CreateEventModal;
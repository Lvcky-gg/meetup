import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpecificEvent } from '../../store/events';
import { useModal } from "../../context/Modal";
import { useEffect } from 'react';

import Logo from '../LoginFormModal/PACKAGE_Artboard_1_copy_3.png'
import { getSpecificGroup } from '../../store/specificGroup';
import { getEvents } from '../../store/events';
import { useParams } from 'react-router-dom';
import './createEvent.css'


function CreateEventModal({groupId}) {



  const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState(0);
//   let [venueId, setVenueId] = useState(0);
  const [price, setPrice] = useState(0.00);
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false)
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);





useEffect(()=>{
    const validationErrors = [];
    if(name.length < 5)validationErrors.push("Name must be at least 5 characters");
    if(capacity < 0)validationErrors.push("Capacity is too low");
    if(startDate < new Date())validationErrors.push("Start date must be in the future");
    if(endDate < startDate)validationErrors.push("End date must be after start date");
    setErrors(validationErrors)

    getEvents(dispatch)

},[dispatch, name, capacity, startDate, endDate])



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit)
    // if(venueId=== 0) setVenueId(null)
    if(!errors.length){
    return createSpecificEvent(+groupId,{
    // venueId,
    name,
    type,
    capacity,
    price,
    description,
    startDate,
    endDate,

    })(dispatch)
    // .then(async(val)=>{console.log('hello', await val.json())})
      .then(closeModal)
      .then(getEvents(dispatch))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
      
  };

  return (
    <div className="createEventModalContainer">
      <img src={Logo} alt="photo"></img>
    <form  className='createEventModal' onSubmit={handleSubmit}>
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
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
         
        /> 
            
    </div>
    <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
         
        /> 
            
    </div>
    <label>Type</label>
    <select
    name='type'
    required
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

export default CreateEventModal;
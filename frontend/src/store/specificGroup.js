import { csrfFetch } from './csrf';
const GET_BYID='GET_BYID';

const grabSpecificGroup = (data) => {
    return {
        type: GET_BYID,
        payload:data,
      };
};

export const getSpecificGroup = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}`)
    const data = await res.json();
   
    dispatch(grabSpecificGroup(data));
    return data;
}

const initialState = {SpecificGroup:null};

 const specificGroupReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
        case GET_BYID:
            newState = Object.assign({}, action.payload);
            return newState;
        default:return state;
    }
}
export default specificGroupReducer;
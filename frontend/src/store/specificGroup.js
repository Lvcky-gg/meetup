import { csrfFetch } from './csrf';
const GET_BYID='GET_BYID';
const ADD_IMG='ADD_IMG';

const addImage = (data) => {
    return {
        type: ADD_IMG,
        payload:data,
      };
};

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

export const addImg = (input, groupId) => async dispatch => {
    const { url, preview } = input
    const res = await csrfFetch(`/api/groups/${groupId}/images`,{
        method:"POST",
        body:JSON.stringify({
            url,
            preview
        })
    })
    const data = await res.json();
    dispatch(addImage(data));
    return res;
}

const initialState = {SpecificGroup:null};

 const specificGroupReducer = (state = initialState, action) => {
    let newState ={...state};
    
    switch (action.type) {
        case GET_BYID:
            newState =  {...newState, ...action.payload};
            return newState;
        case ADD_IMG:
            console.log('payload',newState)
            newState.GroupImages.push(action.payload)
            return newState;
        default:return state;
    }
}
export default specificGroupReducer;
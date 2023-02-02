import { csrfFetch } from './csrf';

const ADD_GROUP = 'ADD_GROUP'
const EDIT_GROUP='EDIT_GROUP'
const GET_GROUP='GET_GROUP'
const DELETE_GROUP='DELETE_GROUP'

const grabGroups = (data) => {
    return {
        type: GET_GROUP,
        payload:data,
      };
}

const deleteGroup = (groupId) => {
    return {
        type:DELETE_GROUP,
        payload:groupId,
    }
}
const changeGroup = (data) => {
    return {
        type: ADD_GROUP,
        payload:data,
      };
}

export const getGroups = async dispatch=> {
    const res = await fetch('/api/groups')
    const data= await res.json();
    dispatch(grabGroups(data));
    return data;
}

export const getMyGroups = async dispatch=> {
    const res = await fetch('/api/groups/current')
    const data= await res.json();
    console.log(data)
    dispatch(grabGroups(data));
    return data;
}
//need to get this and add a state to the thing as well
export const getSpecificGroup = (groupId) => async dispatch => {
    const res = await fetch(`/api/groups/${groupId}`)
   
    const data = await res.json()
    dispatch(grabGroups(data));
    return data;
}

export const createGroup = (input) => async dispatch => {
    const { name, about, type, bool, city, state, organizerId } = input;
    const response = await csrfFetch("/api/groups", {
      method: "POST",
      body: JSON.stringify({
        name,
        about,
        type,
        "private":bool,
        city, 
        state,
        organizerId
      }),
    });
    const data = await response.json();
    console.log(name)
    dispatch(changeGroup(data));
    return response;
  };
  export const editGroup = (input, groupId) => async dispatch => {
    const { name, about, type, bool, city, state} = input;
    const response = await csrfFetch(`/api/groups/${groupId}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        about,
        type,
        "private":bool,
        city, 
        state
      }),
    });
    const data = await response.json();
  
    dispatch(changeGroup(data));
    return response;
  };

  export const deleteGroupById = (groupId) => async (dispatch) => {
   
    const response = await csrfFetch(`/api/groups/${groupId}`, {
      method: 'DELETE'
    });
    dispatch(deleteGroup(groupId))
    return response;
  };

const initialState = {Groups:null}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GROUP:
          newState = Object.assign({}, action.payload);
          return newState;
          case ADD_GROUP:
            newState = {...state};
            for(let i = 0; i < newState.Groups.length; i++){
                if(newState.Groups[i].id === action.payload.id){
                    newState.Groups[i] = action.payload;
                }
            }
            return newState;
          case DELETE_GROUP:
            newState = Object.assign({}, state);
            console.log('action', action.payload)
           

            for(let i = 0; i < newState.Groups.length; i++){
                if(newState.Groups[i].id === action.payload){
                    newState.Groups.splice([i],1)
                }
            }
            return newState;
        default:return state;
        
    }
}

export default groupReducer;
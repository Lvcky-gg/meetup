import { csrfFetch } from './csrf';
const GET_BYID='GET_BYID';
const ADD_IMG='ADD_IMG';
const REMOVE_IMG = "REMOVE_IMG"

const deleteImg = (imgId) => {
    return {
        type:REMOVE_IMG,
        payload:imgId
    }

}
const addImage = (data) => {
    return {
        type: ADD_IMG,
        payload:data,
      };
};

export const deleteImgById = (imgId) => async (dispatch) => {
   
    const response = await csrfFetch(`/api/group-images/${imgId}`, {
      method: 'DELETE'
    });
    dispatch(deleteImg(imgId))
    return response;
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
    let newState = {...state};
    
    switch (action.type) {
        case GET_BYID:
            newState =  { ...action.payload};
            return newState;
        case ADD_IMG:
            newState.GroupImages.push(action.payload)
            return newState;
        case REMOVE_IMG:
        
            for(let i = 0; i <newState.GroupImages.length; i++){
                if(newState.GroupImages[i].id === action.payload){
                    newState.GroupImages.splice([i],1)
                }
            }
            return newState;

        default:return state;
    }
}
export default specificGroupReducer;
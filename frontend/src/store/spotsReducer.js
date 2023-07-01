import { useDispatch } from "react-redux";
import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = 'spots/GetAllSpots';
const EDIT_EXISTING_SPOT = 'spots/EditExistingSpot';
const CREATE_NEW_SPOT = 'spots/PostNewSpot';
const DELETE_SPOT = 'spots/DeleteSpot';



//action functions
export const actionGetSpots = (payload) => ({
    type: GET_ALL_SPOTS,
    payload
})

export const actionEditSpot = (payload) => ({
    type: EDIT_EXISTING_SPOT,
    payload
})

export const actionCreateSpot = (spot) => ({
    type: CREATE_NEW_SPOT,
    spot
})

export const actionDeleteSpot = (spot) => ({
    type: DELETE_SPOT,
    spot
})



//thunk funcs
export const thunkGetSpots = () => async (dispatch) => {
        const res = await fetch('/api/spots');

        if(res.ok) {
            const dispatch = useDispatch();
            const response = await res.json();
            dispatch(actionGetSpots(response));

            return response;
        }
}


export const thunkCreateNewSpot = (data) => async (dispatch) => {
    try {

        const res = await csrfFetch('/api/spotform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const newSpot = await res.json();
            dispatch(actionCreateSpot(newSpot));
            return newSpot;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }

}



//reducers
export default function SpotsReducer (state = {}, action) {
    switch(action.type) {
        case GET_ALL_SPOTS :{
            console.log('whats this', action.payload);
            return {...state, ...action.payload.Spots}
        };
        case CREATE_NEW_SPOT : {

            return null
        }
        case EDIT_EXISTING_SPOT : {
            return null
        }
        case DELETE_SPOT : {

        }
        default:
             return state
    }
}

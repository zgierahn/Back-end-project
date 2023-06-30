

//types
const GET_ALL_SPOTS = 'spots/GetAllSpots';


//action functions
const actionGetSpots = (payload) => ({
    type: GET_ALL_SPOTS,
    payload
})

//thunk funcs
export const thunkGetSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')

    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetSpots(response));
        return response;
    }
}


//reducers
export default function SpotsReducer (state = {}, action) {
    switch(action.type) {
        case GET_ALL_SPOTS :{
            console.log('whats this', action.payload);
            return {...state, ...action.payload.Spots}
        };
        default:
             return state
    }
}

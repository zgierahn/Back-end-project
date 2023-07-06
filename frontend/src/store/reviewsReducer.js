import { csrfFetch } from "./csrf";

//types
const GET_REVIEWS_BY_SPOT = 'reviews/GetReviewsBySpotId';
const EDIT_EXISTING_REVIEW = 'reviews/EditReviewById';
const CREATE_REVIEW = 'reviews/CreateNewReview';
const DELETE_REVIEW = 'reviews/DeleteReview';
const CREATE_REVIEW_IMAGE = 'reviews/CreateImage';

//action functions
export const actionGetReviews = (spotId) => ({
    type: GET_REVIEWS_BY_SPOT,
    spotId
});

export const actionEditReview = (reviewId) => ({
    type: EDIT_EXISTING_REVIEW,
    reviewId
});

export const actionCreateReview = (data) => ({
    type: CREATE_REVIEW,
    data
});

export const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const actionCreateReviewImage = (image) => ({
    type: CREATE_REVIEW_IMAGE,
    image
});


//thunk funcs
export const thunkGetUserReviews = () => async (dispatch) => {
    console.log('thunkGetUserReviews is running');
    const res = await fetch('/api/reviews/current');

    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetReviews(response));

        return response;
    }
}

export const thunkGetReviewsBySpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetReviews(spotId));

        return response;
    }
}


export const thunkDeleteSpot = (reviewId) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE'
    });

    if(res.ok) {
        const review = await res.json();
        dispatch(actionDeleteReview(reviewId));
        return review;
    }
    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkCreateReview = (data, spotId) => async (dispatch) => {
    try {
        console.log('what is the data coming into createREVIEwTHUNK', data);
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`,  //fix spot ID
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const review = await res.json();
            dispatch(actionCreateReview(review));
            return review;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


export const thunkCreateReviewImage = (data) => async (dispatch) => {
    try {
        console.log('what is the data coming into createREVIEwIMAGE', data);
        const res = await csrfFetch(`/api/reviews/${data.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const newImage = await res.json();
            dispatch(actionCreateReviewImage(newImage));
            return newImage;
        }

    } catch (error) {
        const err = await error.json();
        console.log(err);
        return err;
    }
};


const intitialState = {
    spot: {},
    user: {}

};


//reducer
export default function ReviewsReducer (state = intitialState, action) {
    switch(action.type) {
        case GET_REVIEWS_BY_SPOT :{
            console.log('===============================================');
            console.log('i need to see these two', state, action);
            return {...state, spot: {[action.reviews.id] : action.reviews}}
        };
        case CREATE_REVIEW : {
            return {...state, spot : { [action.reviews.id] : action.reviews } }
        }
        // //in progress
        // case CREATE_SPOT_IMAGE : {
        //     return {...state, singleSpot: action.singleSpot.image}
        // }
        // case EDIT_EXISTING_SPOT : {
        //     return {...state, singleSpot: { [action.spot.id] : action.spot}}
        // }

        case DELETE_REVIEW : {
            const  newState = {...state}
            delete newState.reviews.spot[action.reviews.id]
            return newState
        }
        default:
             return state
    }
};

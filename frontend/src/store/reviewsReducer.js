import { csrfFetch } from "./csrf";

//types
const GET_REVIEWS_BY_SPOT = 'reviews/GetReviewsBySpotId';
const EDIT_EXISTING_REVIEW = 'reviews/EditReviewById';
const CREATE_REVIEW = 'reviews/CreateNewReview';
const DELETE_REVIEW = 'reviews/DeleteReview';
const CREATE_REVIEW_IMAGE = 'reviews/CreateImage';

//action functions
export const actionGetReviews = (data) => ({
    type: GET_REVIEWS_BY_SPOT,
    data
});

export const actionEditReview = (reviewId) => ({
    type: EDIT_EXISTING_REVIEW,
    reviewId
});

export const actionCreateReview = (review) => ({
    type: CREATE_REVIEW,
    review
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
try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(res.ok) {
        const response = await res.json();
        dispatch(actionGetReviews(response));
        return response;
    }
} catch (error) {
    const err = await error.json();
        console.log(err);
        return err;
    }

}


export const thunkDeleteReview = (reviewId) => async (dispatch) => {
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


export const thunkCreateReview = (data, user, spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok) {
        const review = await res.json();
            review.User = user
            dispatch(actionCreateReview(review));
            return review;
        }

    } catch (error) {
        const err = await error.json();
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
            const newState = {...state, spot : {...state.spot}};
            newState.spot = {};
            action.data.Reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        };
        case CREATE_REVIEW : {
            const newState = {...state, spot : {...state.spot} };
            newState.spot[action.review.id] = action.review;
            console.log('newstate', newState);
            return newState;
        }

        // //in progress
        // case CREATE_REVIEW_IMAGE : {
        //     return {...state, spot: action.singleSpot.image}
        // }
        // case EDIT_EXISTING_REVIEW : {
        //     return {...state, spot: { [action.spot.id] : action.spot}}
        // }

        case DELETE_REVIEW : {
            const  newState = {...state, spot : {...state.spot}}
            delete newState.spot[action.reviewId]
            return newState
        }
        default:
             return state
    }
};


//notes

// return {...state, allSpots: {...action.payload.Spots}}

// const newState = {...state, spot:{...state.spot}}
//             newState.spot[action.review.id] = action.review
//             return newState

// let createReviewButton = false
//     reviewArr.map((review)=> {
//         return (
//             !user.user || review.userId === user.user.id || user.user.id === spot.ownerId  ? createReviewButton = false : createReviewButton= true
//         )
//     })


{/* <h3><span><i className="fa-solid fa-star"></i></span>{ spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}·${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating} · ${spot.numReviews} reviews` }</h3> */}

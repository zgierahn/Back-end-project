import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkGetUserReviews } from '../../store/reviewsReducer';




function ReviewsByUser() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(thunkGetUserReviews())
  }, [dispatch]);

  const reviewsObj = useSelector(state => state);
  const reviewsArray = Object.values(reviewsObj);
  console.log('reviews object', reviewsObj);
//need to connect the reviews reducer to gain access
  return (
    <h1>ReviewsByUser</h1>


  )
}

export default ReviewsByUser

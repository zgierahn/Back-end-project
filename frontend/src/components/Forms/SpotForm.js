import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateNewSpot } from '../../store/spotsReducer';
import './SpotForm.css';

function SpotForm() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');




const handleSubmit = async (e) => {
  e.preventDefault();
  let trackErrors = {};
  setErrors({});
  if(!address) {trackErrors.address = "Must have a valid address"}
  if(!city) {trackErrors.city = "Must have a valid city"}
  if(!state) {trackErrors.state = "Must have a valid state"}
  if(!country) {trackErrors.country = "Must have a valid country"}
  if(!name) {trackErrors.name = "Must have a valid name"}
  if(description.length < 30) {trackErrors.description = "Description needs 30 or more characters"}
  if(price < 1) {trackErrors.price = "Price per night is required"}
  if(!url) {trackErrors.url = "Must have a valid url"}
  setErrors(trackErrors);
  if(Object.values(errors).length) return null;
  else {
    let spot = {address, city, state, country, name, description, price, lat : 90, lng : 90, url}
    const submitSpot =  await dispatch(thunkCreateNewSpot(spot));
    console.log('this is submit spot', submitSpot);
    if(submitSpot.id){
      console.log(submitSpot.id);
      history.push(`/spots/${submitSpot.id}`)
    }
  }
}


return (
    <div className='main-spot-form-container'>
      <form className='inner-spot-form-container'>
        <h1 className='h2-spot-form'>Create a New Spot</h1>
        <label>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a
            reservation.
        </p>
          Country:
            <input
              className='create-spot-input'
              placeholder='Country'
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && <div className="errors">{errors.country}</div>}
          <label>
          Street Address:
          <input
            className='create-spot-input'
            placeholder='Street Address'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <div className="errors">{errors.address}</div>}
        </label>
        <span className='city-state-span'>
          <label>
            City:
            <input
              className='create-city-input'
              placeholder='City'
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          {errors.city && <div className="errors">{errors.city}</div>}
          </label>
          <p className='the-comma'>,</p>
          <label>
            State:
            <input
              className='create-state-input'
              placeholder='State'
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {errors.state && <div className="errors">{errors.state}</div>}
          </label>
        </span>
        {/* <hr></hr> */}
        <label>
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.
          </p>
          <textarea
            className='create-spot-description-box'
            placeholder='Please write at least 30 characters'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <div className="errors">{errors.description}</div>}
        <label>
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            className='create-spot-input'
            placeholder='Name of your Spot'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <div className="errors">{errors.name}</div>}
        <label>
          <h3>Set a base price for your Spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <span className='price-span'>
            <p>$</p>
            <input
              className='create-spot-input'
              placeholder='Price per night (USD)'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
            </span>
        </label>
        {errors.price && <div className="errors">{errors.price}</div>}
        <label>
          <h3>Liven up your spot with photos</h3>
          <p>
            Submit a link to at least one photo to publish your spot.
          </p>
          <input
            className='create-spot-input'
            placeholder='Preview Image URL'
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className='create-spot-input'
            placeholder='Image URL'
            type="url"
          />
          <input
            className='create-spot-input'
            placeholder='Image URL'
            type="url"
          />
          <input
            className='create-spot-input'
            placeholder='Image URL'
            type="url"
          />
          <input
            className='create-spot-input'
            placeholder='Image URL'
            type="url"
          />
        </label>
        {errors.url && <div className="errors">{errors.url}</div>}
        <button className='submit-spot-button' type="submit" onClick={handleSubmit}>Create Spot</button>
      </form>
    </div>
)};

export default SpotForm

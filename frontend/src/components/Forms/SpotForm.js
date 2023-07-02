import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreateNewSpot } from '../../store/spotsReducer';



function SpotForm({ formType }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(90);



const handleSubmit = async (e) => {
  e.preventDefault();
  // let errors = {};
  // setErrors({});
  let spot = {address, city, state, country, name, description, price, lat, lng}
  // if(!address) {errors.address = "Must have a valid address"}
  // if(!city) {errors.city = "Must have a valid city"}
  // if(!state) {errors.state = "Must have a valid state"}
  // if(!country) {errors.country = "Must have a valid country"}
  // if(!name) {errors.name = "Must have a valid name"}
  // if(!description){errors.description = "Must have a valid description"}
  // if(price < 1) {errors.price = "Must have a valid price"}
  // if(!lat) {errors.latitude = "Must have a valid latitude"}
  // if(!lng){errors.longitude = "Must have a valid longitude"}
  // setErrors(errors);
  const submitSpot =  await dispatch(thunkCreateNewSpot(spot));
  console.log('this my new spot G', submitSpot);

}


  return (
    <form>
      <h2>Create Form</h2>
        <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      {/* {errors.address && <div className="errors">{errors.address}</div>} */}
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      {/* {errors.city && <div className="errors">{errors.city}</div>} */}
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      {/* {errors.state && <div className="errors">{errors.state}</div>} */}
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      {/* {errors.country && <div className="errors">{errors.country}</div>} */}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {/* {errors.name && <div className="errors">{errors.name}</div>} */}
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {/* {errors.description && <div className="errors">{errors.description}</div>} */}
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      {/* {errors.price && <div className="errors">{errors.price}</div>} */}

      <button type="submit" onClick={handleSubmit}>Show me the money!</button>
    </form>
  )
};

export default SpotForm

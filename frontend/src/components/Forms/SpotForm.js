import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function SpotForm() {
  const [formType, setFormType] = useState('');


function handleSubmit(e) {
e.preventDefault();

}

// {
//   "address": "123 Disney Lane",
//   "city": "San Francisco",
//   "state": "California",
//   "country": "United States of America",
//   "lat": 37.7645358,
//   "lng": -122.4730327,
//   "name": "App Academy",
//   "description": "Place where web developers are created",
//   "price": 123
// }


  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      {/* <div className="errors">{errors.understanding}</div> */}
      <label>
        Address:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      {/* <div className="errors">{errors.improvement}</div> */}
      <label>
        City:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          // value={improvement}
          // onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          // value={variable}
          // onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>

      <button type="submit">Show me the money!</button>
    </form>
  )
};

export default SpotForm

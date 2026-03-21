import React from 'react';
import './FormComponent.css';

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <div className="page">

      {/* ── Form Section ─────────────────────────────────── */}
      <div className="form-wrapper">
        <header className="form-header">
          <h1>Sample form</h1>
        </header>

        <div className="form-body">
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleChange}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={data.age}
              onChange={handleChange}
            />

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            <div className="select-group">
              <label><strong>Select your destination</strong></label>
              <select name="destination" value={data.destination} onChange={handleChange}>
                <option value="">-- Please Choose a destination --</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
                <option value="Thailand">Thailand</option>
              </select>
            </div>

            <div className="checkbox-group">
              <label><strong>Dietary restrictions:</strong></label>
              <label>
                <input
                  type="checkbox"
                  name="nutsFree"
                  checked={data.nutsFree === 'on'}
                  onChange={handleChange}
                />
                Nuts free
              </label>
              <label>
                <input
                  type="checkbox"
                  name="lactoseFree"
                  checked={data.lactoseFree === 'on'}
                  onChange={handleChange}
                />
                Lactose free
              </label>
              <label>
                <input
                  type="checkbox"
                  name="vegan"
                  checked={data.vegan === 'on'}
                  onChange={handleChange}
                />
                Vegan
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* ── Info Section ──────────────────────────────────── */}
      <div className="info-section">
        <h2>Entered information:</h2>
        <p><em>Your name: {data.firstName} {data.lastName}</em></p>
        <p><em>Your age: {data.age}</em></p>
        <p><em>Your gender: {data.gender}</em></p>
        <p><em>Your destination: {data.destination}</em></p>
        <p><em>Your dietary restrictions:</em></p>
        <p className="restriction">**Nuts free : {data.nutsFree === 'on' ? 'Yes' : 'No'}</p>
        <p className="restriction">**Lactose free : {data.lactoseFree === 'on' ? 'Yes' : 'No'}</p>
        <p className="restriction">**Vegan meal : {data.vegan === 'on' ? 'Yes' : 'No'}</p>
      </div>

    </div>
  );
}

export default FormComponent;

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <>
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

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>

        <select
          name="destination"
          value={data.destination}
          onChange={handleChange}
        >
          <option value="">-- Please Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
          <option value="Thailand">Thailand</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="nutsFree"
            checked={data.nutsFree}
            onChange={handleChange}
          />
          Nuts free
        </label>

        <label>
          <input
            type="checkbox"
            name="lactoseFree"
            checked={data.lactoseFree}
            onChange={handleChange}
          />
          Lactose free
        </label>

        <label>
          <input
            type="checkbox"
            name="vegan"
            checked={data.vegan}
            onChange={handleChange}
          />
          Vegan
        </label>

        <button>Submit</button>
      </form>

      <section>
        <h3>Entered information:</h3>
        <p>Your name: {data.firstName} {data.lastName}</p>
        <p>Your age: {data.age}</p>
        <p>Your gender: {data.gender}</p>
        <p>Your destination: {data.destination}</p>
        <p>Your dietary restrictions:</p>
        <p>Nuts free: {data.nutsFree ? "Yes" : "No"}</p>
        <p>Lactose free: {data.lactoseFree ? "Yes" : "No"}</p>
        <p>Vegan meal: {data.vegan ? "Yes" : "No"}</p>
      </section>
    </>
  )
}

export default FormComponent

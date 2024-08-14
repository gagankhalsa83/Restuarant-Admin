import React, { useState, useEffect } from 'react';

function RestaurantForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues || { name: '', description: '', location: '' });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={values.location}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RestaurantForm;

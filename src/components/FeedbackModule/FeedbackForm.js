import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FeedbackForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', rating: 0 });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/savefeedback', formData);
      setFormData({ name: '', email: '', comment: '', rating: 0 });
      onClose(); // Close the feedback form after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <h3>Give Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleFormChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleFormChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;

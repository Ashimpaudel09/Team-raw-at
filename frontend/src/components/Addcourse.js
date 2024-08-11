import React, { useState } from 'react';
import '../css/addcourse.css'; // Import the CSS file for styling

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can handle form submission, e.g., send the data to a server
    // For now, we are just showing an alert

    if (!title || !description || !file) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      alert('Course submitted successfully! It will be reviewed by our experts.');
      // Clear the form after submission
      setTitle('');
      setDescription('');
      setFile(null);
    }, 1000);
  };

  return (
    <div className="add-course-container">
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Course Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter course description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Course Source File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCourse;

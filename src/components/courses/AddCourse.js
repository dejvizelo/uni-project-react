import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddCourse = () => {
  let history = useHistory();
  const [course, setCourse] = useState({
    name: ""
  });

  const { name } = course;
  const onInputChange = e => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/courses", course);
    history.push("/courses");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Course</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the course name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

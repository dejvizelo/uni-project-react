import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditCourse = () => {
  let history = useHistory();
  const { id } = useParams();
  const [course, setCourse] = useState({
    name: "",
  });

  const { name } = course;
  const onInputChange = e => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCourse();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios
    .put(`http://localhost:5000/courses/${id}`, course)
    .catch((error) => {
      console.log(error);
    });
    history.push("/courses");
  };

  const loadCourse = async () => {
    const result = await axios.get(`http://localhost:5000/courses/${id}`);
    setCourse(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Course</h2>
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
          <button className="btn btn-warning btn-block">Update Course</button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;

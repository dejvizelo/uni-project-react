import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditStudent = () => {
  let history = useHistory();
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    age: "",
  });

  const { name, age } = student;
  const onInputChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios
    .put(`http://localhost:5000/students/${id}`, student)
    .catch((error) => {
      console.log(error);
    });
    history.push("/");
  };

  const loadStudent = async () => {
    const result = await axios.get(`http://localhost:5000/students/${id}`);
    setStudent(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Student</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your age"
              name="age"
              value={age}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Student</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;

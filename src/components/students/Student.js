import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const res = await axios.get(`http://localhost:5000/students/${id}`);
    setStudent(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Students
      </Link>
      <h1 className="display-4">Student ID: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {student.name}</li>
        <li className="list-group-item">Age: {student.age}</li>
      </ul>
    </div>
  );
};

export default Student;

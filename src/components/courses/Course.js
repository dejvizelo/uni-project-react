import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [course, setCourse] = useState({
    name: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadCourse();
  }, []);
  const loadCourse = async () => {
    const res = await axios.get(`http://localhost:5000/courses/${id}`);
    setCourse(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/courses">
        Back to Courses
      </Link>
      <h1 className="display-4">Course ID: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {course.name}</li>
      </ul>
    </div>
  );
};

export default Course;

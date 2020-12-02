import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const result = await axios
    .get("http://localhost:5000/courses")
    .catch((error) => {
      console.log(error);
    });
    setCourse(result.data.reverse());
  };

  const deleteCourse = async id => {
    await axios.delete(`http://localhost:5000/courses/${id}`);
    loadCourses();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/courses/${course.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/courses/edit/${course.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

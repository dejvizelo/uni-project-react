import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [course, setCourse] = useState({
    name: "",
  });

  const [regStudent, setRegStudents] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCourse();
    loadRegStudents();
  }, []);

  const loadCourse = async () => {
    const res = await axios.get(`http://localhost:5000/courses/${id}`);
    setCourse(res.data);
  };

  const loadRegStudents = async () => {
    const res = await axios.get(`http://localhost:5000/courses/${id}/registeredStudents`);
    setRegStudents(res.data.reverse());
  };

  const unenrollStudent = async (sId) => {
    await axios.delete(`http://localhost:5000/courses/${id}/unenroll/${sId}`);
    loadRegStudents();
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
      <h3 style={{marginTop: '20px'}}>Registered students</h3>
      <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regStudent.map((regStudent, index) => (
              <tr>
                <td>{regStudent.id}</td>
                <td>{regStudent.name}</td>
                <td>{regStudent.age}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/students/${regStudent.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => unenrollStudent(regStudent.id)}
                  >
                    Unenroll
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Course;

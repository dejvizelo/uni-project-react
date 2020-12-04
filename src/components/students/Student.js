import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
  });

  const [regCourse, setRegCourses] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadStudent();
    loadRegCourses();
  }, []);

  const loadStudent = async () => {
    const res = await axios.get(`http://localhost:5000/students/${id}`);
    setStudent(res.data);
  };

  const loadRegCourses = async () => {
    const res = await axios.get(`http://localhost:5000/students/${id}/enrolledCourses`);
    setRegCourses(res.data.reverse());
  };

  const unenrollStudent = async (cId) => {
    await axios.delete(`http://localhost:5000/courses/${cId}/unenroll/${id}`);
    loadRegCourses();
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
      <h3 style={{marginTop: '20px'}}>Registered courses</h3>
      <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regCourse.map((regCourse, index) => (
              <tr>
                <td>{regCourse.id}</td>
                <td>{regCourse.name}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/courses/${regCourse.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => unenrollStudent(regCourse.id)}
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

export default Student;

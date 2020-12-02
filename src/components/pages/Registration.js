import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Registration = () => {
    let history = useHistory();
    const [courses, setCourses] = useState([]);

    const [registration, setReg] = useState({
        cId: "",
        sId: ""
    });

    const onInputChange = e => {
        setReg({ ...registration, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios
            .post(`http://localhost:5000/courses/registration`, registration)
            .catch((error) => {
                console.log(error);
            });
        history.push("/courses");
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const result = await axios
            .get("http://localhost:5000/courses")
            .catch((error) => {
                console.log(error);
            });
        setCourses(result.data.reverse());
    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Make a registration</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <select
                            name="cId"
                            value={setReg.cId}
                            defaultValue=""
                            onChange={e => onInputChange(e)}>
                            <option hidden value="">Select a course</option>
                            {courses.map((course, index) => (
                                <option value={course.id}>{course.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter the student ID"
                            name="sId"
                            value={setReg.sId}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
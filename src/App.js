import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddStudent from "./components/students/AddStudent";
import EditStudent from "./components/students/EditStudent";
import Student from "./components/students/Student";
import AddCourse from "./components/courses/AddCourse";
import EditCourse from "./components/courses/EditCourse";
import Course from "./components/courses/Course";
import Courses_page from "./components/pages/Courses_page";
import Registration from "./components/pages/Registration";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/students/add" component={AddStudent} />
          <Route exact path="/students/edit/:id" component={EditStudent} />
          <Route exact path="/students/:id" component={Student} />
          <Route exact path="/courses" component={Courses_page} />
          <Route exact path="/courses/add" component={AddCourse} />
          <Route exact path="/courses/edit/:id" component={EditCourse} />
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path="/registration" component={Registration} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

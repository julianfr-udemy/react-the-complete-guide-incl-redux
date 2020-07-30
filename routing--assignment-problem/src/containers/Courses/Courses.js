import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Course from '../Course/Course';
import './Courses.css';


class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: 'Angular - The Complete Guide' },
      { id: 2, title: 'Vue - The Complete Guide' },
      { id: 3, title: 'PWA - The Complete Guide' }
    ]
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {
            this.state.courses.map(course => (
              <Link
                key={course.id}
                to={{
                  pathname: this.props.match.path + "/" + course.id,
                  search: "?name=" + course.title
                }}>
                <article className="Course">{course.title}</article>
              </Link>
            ))
          }
        </section>
        <Route path={this.props.match.path + "/:id"} component={Course} />
      </div>
    );
  }
}

export default Courses;
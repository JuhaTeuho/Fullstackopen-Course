
import React from 'react'

const CourseHeader = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce( (sum, next) => sum + next.exercises, 0)
  
    return (
      <>
        <p><strong>total of {total} exercises</strong></p>
      </>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <CourseHeader course={props.name}/>
        <Content parts={props.parts}/>
        <Total parts={props.parts}/>
      </div>
    )
  }

export default Course
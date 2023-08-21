const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} course={course} />
      {course.parts.map(value =>
        <Part key={value.id} value={value} />
      )}
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({ value }) => {
  return (
    <p>{value.name} {value.exercises}</p>
  )
}

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((accumulator, currentValue) =>
    accumulator + currentValue.exercises, 0);
  return <strong><p>total of {totalExercises} exercises</p></strong>;
};


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  );
}

export default App
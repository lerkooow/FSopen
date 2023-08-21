import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    );
};

const Part = ({ value }) => {
    return (
        <p>{value.name} {value.exercises}</p>
    );
};

const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((accumulator, currentValue) =>
        accumulator + currentValue.exercises, 0);
    return <strong><p>total of {totalExercises} exercises</p></strong>;
};

const Course = ({ course }) => {
    return (
        <div>
            <Header key={course.id} course={course} />
            {course.parts.map(value =>
                <Part key={value.id} value={value} />
            )}
            <Total course={course} />
        </div>
    );
};

export default Course;
const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        {props.parts.map((item) => {
            return <Part part={item} key={item.id} />
        })}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} @ {props.part.exercises}
    </p>
)

const Total = (props) => {
    const total = props.parts.reduce((accumulator, item) => accumulator + item.exercises,0)
    return <p>Total Number of Exercises : {total}</p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
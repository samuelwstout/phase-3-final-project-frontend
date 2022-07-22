import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Todo App</h1>
            <NavLink to="/folders">Folders</NavLink>
        </div>
    )
}
export default Home
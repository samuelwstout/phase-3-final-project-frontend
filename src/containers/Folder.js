import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Todo from '../components/Todo'
import TodoForm from '../containers/TodoForm'

const Folder = () => {
    const [folder, setFolder] = useState({
        todos: []
    })

    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/folders/${params.id}/todos`)
        .then(res => res.json())
        .then(data => {
            setFolder(data)
        })
    }, [params])

const todos = folder.todos.map(t => <Todo key={t.id} todo={t} />)

    return (
        <div>
           <h2>{folder.name}</h2>
           <TodoForm folder={folder} />
           <h3>Todos:</h3>
           {todos}
        </div>
    )
}
export default Folder
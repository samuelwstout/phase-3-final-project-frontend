import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TodoForm from './TodoForm'

const Folder = () => {
    const [folder, setFolder] = useState({
        todos: []
    })
    const [newTodo, setNewTodo] = useState('')
    const [editId, setEditId] = useState(0)
    const [editInput, setEditInput] = useState('')

    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/folders/${params.id}/todos`)
        .then(res => res.json())
        .then(data => {
            setFolder(data)
        })
    }, [params])

    const todos = folder.todos.map((t) => {
        return (
         <h3 key={t.id}>{t.name}</h3>
        )
    })
    
    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        fetch(`http://localhost:9292/folders/${params.id}/todos/${editId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: editInput
          }),
        })
        .then(r => r.json())
        .then(data => {
         console.log(data)
        })
        setEditInput('')
      }
      


    return (
        <div>
           <h2>{folder.name}</h2>
           <TodoForm folder={folder} setNewTodo={setNewTodo} todos={todos} />

           <h4>Edit Todo:</h4>
        <form onSubmit={handleSubmitUpdate}>
            <select onChange={e => setEditId(e.target.value)}>
                <option>Select a todo</option>
                {
                folder.todos.map((f) => {
                return <option key={f.id} value={f.id}>{f.name}</option>
                })
                }
            </select>
            <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} />
            <input type='submit' />
        </form>

           <h3>Todos:</h3>
           {todos}
           <h3>{newTodo}</h3>
        </div>
    )
}
export default Folder
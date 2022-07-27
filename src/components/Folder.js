import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TodoForm from './TodoForm'

const Folder = () => {
    const [folder, setFolder] = useState({
        todos: []
    })
    const [todoArray, setTodoArray] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editId, setEditId] = useState(0)
    const [editInput, setEditInput] = useState('')
    const [deleteId, setDeleteId] = useState(0)
    
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/folders/${params.id}/todos`)
        .then(res => res.json())
        .then(data => {
           setFolder(data)
           const array = (data.todos.map((t) => {
           return <h3 key={t.id}>{t.name}</h3>
           }))
           setTodoArray(array)
        })
    }, [params])

    
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
        .then(update => {
            const old = folder.todos.find(x => x.id === update.id)
            const arrayNames = folder.todos.map((t) => t.name)
            arrayNames.splice(arrayNames.findIndex(s => s === old.name), 1)
            arrayNames.push(update.name)
            setTodoArray(arrayNames.map((s, index) => {
                return <h3 key={index}>{s}</h3>
            }))
        })
        setEditInput('')
      }

      const handleSubmitDelete = (e) => {
        e.preventDefault()
        fetch(`http://localhost:9292/folders/${params.id}/todos/${deleteId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(r => r.json())
        .then(data => {
            const arrayNames = folder.todos.map((t) => t.id)
            const index = arrayNames.indexOf(data.id)
            arrayNames.splice(index, 1)
            const finalArray = folder.todos.filter(s => s.name !== data.name)
            setTodoArray(finalArray.map(s => {
                return <h3 key={s.id}>{s.name}</h3>
            }))
        })
      }

    return (
        <div>
           <h2>{folder.name}</h2>
           <TodoForm folder={folder} setNewTodo={setNewTodo} />

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

        <h4>Delete Todo:</h4>
        <form onSubmit={handleSubmitDelete}>
          <select onChange={e => setDeleteId(e.target.value)}>
            <option>Select a todo</option>
            {
              folder.todos.map((f) => {
                return <option key={f.id} value={f.id}>{f.name}</option>
              })
            }
          </select>
          <input type='submit' />
        </form>

           <h3>Todos:</h3>
           {todoArray}
           <h3>{newTodo}</h3>
        </div>
    )
}
export default Folder
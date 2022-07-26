import {useState} from 'react'
import { useParams } from 'react-router-dom'

const TodoForm = (props) => {

const [createInput, setCreateInput] = useState('')
const [editId, setEditId] = useState(0)
const [editInput, setEditInput] = useState('')
const [deleteId, setDeleteId] = useState(0)

const params = useParams()

const handleSubmitCreate = (e) => {
  e.preventDefault()
  fetch(`http://localhost:9292/folders/${params.id}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: createInput
    }),
  })
  .then(r => r.json())
  .then(data => props.setNewTodo(data.name))
  setCreateInput('')
}

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
  .then(data => data)
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
  .then(data => data)
}

  return (
    <div>
        <h4>Create Todo:</h4>
          <form onSubmit={handleSubmitCreate}>
            <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
            <input type='submit' />
          </form>
        <h4>Edit Todo:</h4>
        <form onSubmit={handleSubmitUpdate}>
          <select onChange={e => setEditId(e.target.value)}>
            <option>Select a todo</option>
            {
              props.folder.todos.map((f) => {
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
              props.folder.todos.map((f) => {
                return <option key={f.id} value={f.id}>{f.name}</option>
              })
            }
          </select>
          <input type='submit' />
        </form>
    </div>
  )
}

export default TodoForm
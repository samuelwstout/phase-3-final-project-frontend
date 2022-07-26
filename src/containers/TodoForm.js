import {useState} from 'react'
import { useParams } from 'react-router-dom'

const TodoForm = ({folder}) => {

const [createInput, setCreateInput] = useState('')

const params = useParams()

const handleSubmit = (e) => {
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
  .then(data => data)
  setCreateInput('')
}

  return (
    <div>
        <h4>Create Todo:</h4>
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={e => setCreateInput(e.target.value)} />
            <input type='submit' />
          </form>
        <h4>Edit Todo:</h4>
        <form>
          <select>
            <option>Select a todo</option>
            {
              folder.todos.map((f) => {
               return <option key={f.id}>{f.name}</option>
              })
            }
          </select>
        </form>
    </div>
  )
}

export default TodoForm
import {useState} from 'react'
import { useParams } from 'react-router-dom'

const TodoForm = () => {

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
  .then(data => console.log(data))
}

  return (
    <div>
      <h4>Create Todo:</h4>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={e => setCreateInput(e.target.value)} />
        <input type='submit' />
      </form>
    </div>
  )
}

export default TodoForm
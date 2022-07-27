import {useState} from 'react'
import { useParams } from 'react-router-dom'

const TodoForm = (props) => {

const [createInput, setCreateInput] = useState('')

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



  return (
    <div>
        <h4>Create Todo:</h4>
          <form onSubmit={handleSubmitCreate}>
            <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
            <input type='submit' />
          </form>
       
    </div>
  )
}

export default TodoForm
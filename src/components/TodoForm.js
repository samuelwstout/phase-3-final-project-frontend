import { useState } from 'react'
import { MyConsumer } from '../MyContext'
import { useParams } from 'react-router-dom'

const TodoForm = () => {

const [createInput, setCreateInput] = useState('')
const params = useParams()

  return (
    <MyConsumer>
        {context => {
            // eslint-disable-next-line
            const folder = context.folders.find(f => f.id == params.id)

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
                .then(data => console.log(data))
                setCreateInput('')
      }

            return (
                <div>
                    {folder && 
                    <div>
                        <h4>Create Todo:</h4>
                        <form onSubmit={handleSubmitCreate}>
                        <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
                        <input type='submit' />
                        </form>
                    </div>
                    }
                </div>
            )
        }}
    </MyConsumer>
  )
}
export default TodoForm
import {useState} from 'react'

const FolderForm = ({folders}) => {

  const [input, setInput] = useState('')
  const [select, setSelect] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:9292/folders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: input
        }),
    })
    .then(r => r.json())
    .then(data => data)
  }
  return (
    <div>
        <h4>Create Folder:</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' onChange={e => setInput(e.target.value)} />
            <input type='submit' />
        </form>
        <form>
            <select>
                <option>Select a folder to delete</option>
                {folders.map((f) => <option key={f.id}>{f.name}</option>)}
            </select>
            <input type='submit' />
        </form>
    </div>
  )
}
export default FolderForm
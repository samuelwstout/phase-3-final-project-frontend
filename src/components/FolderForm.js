import {useState} from 'react'

const FolderForm = (props) => {
  
  const [input, setInput] = useState('')
  
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
    .then(data => props.setNewFolder(data))
    setInput('')
  }
  return (
    <div>
        <h4>Create Folder:</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' value={input} onChange={e => setInput(e.target.value)} />
            <input type='submit' />
        </form>
    </div>
  )
}
export default FolderForm
import {useState} from 'react'

const FolderForm = () => {

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
    .then(data => data)
  }
  return (
    <div>
        <h4>Create Folder:</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' onChange={e => setInput(e.target.value)} />
            <input type='submit' />
        </form>
    </div>
  )
}
export default FolderForm
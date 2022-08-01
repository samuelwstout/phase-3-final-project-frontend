import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Folders = () => {

const [folders, setFolders] = useState([])
const [input, setInput] = useState('')

useEffect(() => {
    fetch('http://localhost:9292/folders')
    .then(res => res.json())
    .then(data => {
        setFolders(data)
    })
}, [])

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
    .then(data => setFolders([...folders, data]))
    setInput('')
  }
  

const foldersList = folders.map(d => <div key={d.id}><Link to={`/folders/${d.id}/todos`}>{d.name}</Link></div>)

return (
    <div>
        <h4>Create Folder:</h4>
            <form onSubmit={handleSubmit}>
                <input type='text' value={input} onChange={e => setInput(e.target.value)} />
                <input type='submit' />
            </form> 
        <h4>Folders:</h4>
        {foldersList}
    </div>
)
}

export default Folders
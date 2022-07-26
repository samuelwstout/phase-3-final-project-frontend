import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FolderLink from './FolderLink'
import FolderForm from './FolderForm'

const Folders = () => {
    
    const [folders, setFolders] = useState([])
    const [newFolder, setNewFolder] = useState({})
    
    useEffect(() => {
        fetch('http://localhost:9292/folders')
        .then(res => res.json())
        .then(data => {
            setFolders(data)
        })
    }, [])

    const foldersList = folders.map(f => <FolderLink key={f.id} folder={f} />)
    const newFoldersList = <Link to={`/folders/${newFolder.id}/todos`}><h3>{newFolder.name}</h3></Link>
    
    return (
        <div>
            <FolderForm setNewFolder={setNewFolder} />
            <h4>Folders:</h4> 
            <ul>
                {foldersList}
            </ul>
            <ul>
                {newFoldersList}
            </ul>
        </div>
    )
}
export default Folders
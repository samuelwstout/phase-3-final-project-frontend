import { useState, useEffect } from 'react'
import FolderLink from '../components/FolderLink'
import FolderForm from '../containers/FolderForm'

const Folders = () => {
    
    const [folders, setFolders] = useState([])

    useEffect(() => {
        fetch('http://localhost:9292/folders')
        .then(res => res.json())
        .then(data => {
            setFolders(data)
        })
    }, [])

    const foldersList = folders.map(f => <FolderLink key={f.id} folder={f} />)

    return (
        <div>
            <h2>Folders:</h2>
            <FolderForm />
            <ul>
                {foldersList}
            </ul>
        </div>
    )
}
export default Folders
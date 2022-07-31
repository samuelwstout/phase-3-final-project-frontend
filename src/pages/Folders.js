import { Link } from 'react-router-dom'
import { MyConsumer } from '../MyContext'
import  FolderForm  from '../components/FolderForm'

const Folders = () => {
    return (
        <MyConsumer>
            {context => {
                const foldersList = context.folders.map(d => <div key={d.id}><Link to={`/folders/${d.id}/todos`}>{d.name}</Link></div>)
                
                return (
                    <div>
                        <FolderForm />
                        <h4>Folders:</h4>
                        {foldersList}
                        </div>
                    )
                }
            }
        </MyConsumer>
        )
    }

export default Folders

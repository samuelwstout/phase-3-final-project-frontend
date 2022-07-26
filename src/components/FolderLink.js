import { Link } from 'react-router-dom'

const FolderLink = ({folder}) => {

  return (
    <div>
        <Link to={`/folders/${folder.id}/todos`}>
            <h3>{folder.name}</h3>
        </Link>
    </div>
  )
}

export default FolderLink

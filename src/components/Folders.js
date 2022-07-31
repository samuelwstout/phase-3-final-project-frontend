import { Link } from 'react-router-dom'
import { MyConsumer } from '../MyContext'

const Folders = () => {
    return (
        <MyConsumer>
            {context => {
                const foldersList = context.folders.map(d => <div key={d.id}><Link to={`/folders/${d.id}/todos`}>{d.name}</Link></div>)
                
                return (
                    <div>
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


//     const [input, setInput] = useState('')
    
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         fetch('http://localhost:9292/folders', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: input
//             }),
//         })
//         .then(r => r.json())
//         .then(data => {
//         const create = <Link to={`/folders/${data.id}/todos`}>{data.name}</Link>
//        return console.log(create)
//         })
//         setInput('')
//     }

// <h4>Create Folder:</h4>
// <form onSubmit={handleSubmit}>
// <input type='text' value={input} onChange={e => setInput(e.target.value)} />
// <input type='submit' />
// </form> 

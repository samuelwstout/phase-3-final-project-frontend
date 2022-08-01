import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Folder = () => {
  const params = useParams()

  const [folderName, setFolderName] = useState('')
  const [todoList, setTodoList] = useState([])
  const [createInput, setCreateInput] = useState('')
  
  useEffect(() => {
    fetch(`http://localhost:9292/folders/${params.id}/todos`)
    .then(res => res.json())
    .then(data => {
       const folderName = <h1>{data.name}</h1>
       setFolderName(folderName)
       const todoList = data.todos.map(t => {
        return (
          <div key={t.id}>
            <ul>
              <li>{t.name}</li>
            </ul>
          </div>
        )
       })
       setTodoList(todoList)
    })
}, [params])

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
  .then(data => {
    const todo = <div key={data.id}><ul><li>{data.name}</li></ul></div>
    setTodoList([...todoList, todo])
  })
  setCreateInput('')
}

// setTodoList([...todoList, data.name])

    return (
        <div>
          {folderName}
          <h4>Create Todo:</h4>
          <form onSubmit={handleSubmitCreate}>
          <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
          <input type='submit' />
          </form>
          <h2>Todos:</h2>
          {todoList}
        </div>
    )
}
export default Folder


    // const [todoArray, setTodoArray] = useState([])
    // const [editId, setEditId] = useState(0)
    // const [editInput, setEditInput] = useState('')
    // const [deleteId, setDeleteId] = useState(0)
    
    
//     const handleSubmitUpdate = (e) => {
//         e.preventDefault()
//         fetch(`http://localhost:9292/folders/${params.id}/todos/${editId}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             name: editInput
//           }),
//         })
//         .then(r => r.json())
//         .then(update => {
//             const old = folder.todos.find(x => x.id === update.id)
//             const arrayNames = folder.todos.map((t) => t.name)
//             arrayNames.splice(arrayNames.findIndex(s => s === old.name), 1)
//             arrayNames.push(update.name)
//             setTodoArray(arrayNames.map((s, index) => {
//                 return <h3 key={index}>{s}</h3>
//             }))
//         })
//         setEditInput('')
//       }

//       const handleSubmitDelete = (e) => {
//         e.preventDefault()
//         fetch(`http://localhost:9292/folders/${params.id}/todos/${deleteId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//         })
//         .then(r => r.json())
//         .then(data => {
//             const arrayNames = folder.todos.map((t) => t.id)
//             const index = arrayNames.indexOf(data.id)
//             arrayNames.splice(index, 1)
//             const finalArray = folder.todos.filter(s => s.name !== data.name)
//             setTodoArray(finalArray.map(s => {
//                 return <h3 key={s.id}>{s.name}</h3>
//             }))
//         })
//       }

//     return (
//         <div>
//           
//            <h4>Update Todo:</h4>
//         <form onSubmit={handleSubmitUpdate}>
//             <select onChange={e => setEditId(e.target.value)}>
//                 <option>Select a todo</option>
//                 {
//                 folder.todos.map((f) => {
//                 return <option key={f.id} value={f.id}>{f.name}</option>
//                 })
//                 }
//             </select>
//             <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} />
//             <input type='submit' />
//         </form>

//         <h4>Delete Todo:</h4>
//         <form onSubmit={handleSubmitDelete}>
//           <select onChange={e => setDeleteId(e.target.value)}>
//             <option>Select a todo</option>
//             {
//               folder.todos.map((f) => {
//                 return <option key={f.id} value={f.id}>{f.name}</option>
//               })
//             }
//           </select>
//           <input type='submit' />
//         </form>

//            <h3>Todos:</h3>
//            {todoArray}
//         </div>
//     )
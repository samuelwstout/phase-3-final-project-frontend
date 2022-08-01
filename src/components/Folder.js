import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Folder = () => {
  const params = useParams()

  const [folderName, setFolderName] = useState('')
  const [todoList, setTodoList] = useState([])
  const [createInput, setCreateInput] = useState('')
  const [deleteId, setDeleteId] = useState(0)
  const [editId, setEditId] = useState(0)
  const [editInput, setEditInput] = useState('')
  
  useEffect(() => {
    fetch(`http://localhost:9292/folders/${params.id}/todos`)
    .then(res => res.json())
    .then(data => {
       const folderName = <h1>{data.name}</h1>
       setFolderName(folderName)
       const todoList = data.todos.map(t => t)
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
    setTodoList([...todoList, data])
  })
  setCreateInput('')
}

const handleSubmitDelete = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/folders/${params.id}/todos/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(r => r.json())
    .then(data => {
        const arrayNames = todoList.map((t) => t.id)
        const index = arrayNames.indexOf(data.id)
        arrayNames.splice(index, 1)
        const finalArray = todoList.filter(s => s.name !== data.name)
        const newTodos = (finalArray.map(t => t))
        setTodoList(newTodos)
    })
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/folders/${params.id}/todos/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editInput
      }),
    })
    .then(r => r.json())
    .then(update => {
        const old = todoList.find(x => x.id === update.id)
        const array = todoList.map((t) => t)
        array.splice(array.findIndex(s => s === old), 1)
        array.push(update)
        const updateTodos = array.map(t => t)
        setTodoList(updateTodos)
    })
    setEditInput('')
  }


    return (
        <div>
          {folderName}
          <h4>Create Todo:</h4>
          <form onSubmit={handleSubmitCreate}>
          <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
          <input type='submit' />
          </form>

          <h4>Delete Todo:</h4>
        <form onSubmit={handleSubmitDelete}>
          <select onChange={e => setDeleteId(e.target.value)}>
            <option>Select a todo</option>
            {
              todoList.map((t) => {
                return <option key={t.id} value={t.id}>{t.name}</option>
              })
            }
          </select>
          <input type='submit' />
        </form>

        <h4>Update Todo:</h4>
        <form onSubmit={handleSubmitUpdate}>
            <select onChange={e => setEditId(e.target.value)}>
                <option>Select a todo</option>
                {
              todoList.map((t) => {
                return <option key={t.id} value={t.id}>{t.name}</option>
              })
                }
            </select>
            <input type='text' value={editInput} onChange={e => setEditInput(e.target.value)} />
            <input type='submit' />
        </form>

          <h2>Todos:</h2>
          {todoList.map(t => {
            return (
                <div key={t.id}>
                    <ul>
                        <li>{t.name}</li>
                    </ul>
                </div>
            )
          })}
        </div>
    )
}
export default Folder
import React from 'react'
import { MyConsumer } from '../MyContext'

const TodoForm = () => {
  return (
    <MyConsumer>
        {context => {

            return (
                <div>
                    {/* <h4>Create Todo:</h4>
                    <form onSubmit={handleSubmitCreate}>
                    <input type='text' value={createInput} onChange={e => setCreateInput(e.target.value)} />
                    <input type='submit' />
                    </form> */}
                    
                </div>
            )
        }}
    </MyConsumer>
  )
}
export default TodoForm
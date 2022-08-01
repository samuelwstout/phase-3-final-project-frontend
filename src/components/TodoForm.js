import { useState } from 'react'
import { MyConsumer } from '../MyContext'
import { useParams } from 'react-router-dom'

const TodoForm = () => {

const params = useParams()

  return (
    <MyConsumer>
        {context => {
            // eslint-disable-next-line
            const folder = context.folders.find(f => f.id == params.id)

           

            return (
                <div>
                    {folder && 
                    <div>
                        
                    </div>
                    }
                </div>
            )
        }}
    </MyConsumer>
  )
}
export default TodoForm
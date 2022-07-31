import React, {useState, useEffect} from 'react'



const MyContext = React.createContext()

const MyProvider = (props) => {
   

    const [folders, setFolders] = useState([])

    useEffect(() => {
        fetch('http://localhost:9292/folders')
        .then(res => res.json())
        .then(data => {
            setFolders(data)
        })
    }, [])

    const addFolder = (data) => {
        setFolders([...folders, data])
    }




    return (<MyContext.Provider value={{
        folders: folders,
        addFolder: addFolder
    }}>
        {props.children}
    </MyContext.Provider>
    )
}

const MyConsumer = MyContext.Consumer

export { MyProvider, MyConsumer }
import React, {useState, useEffect} from 'react'

const MyContext = React.createContext()

const MyProvider = (props) => {
    const [folders, setFolders] = useState([])

    


    return (<MyContext.Provider value={{
        folders: folders
    }}>
        {props.children}
    </MyContext.Provider>
    )
}

const MyConsumer = MyContext.Consumer

export { MyProvider, MyConsumer }
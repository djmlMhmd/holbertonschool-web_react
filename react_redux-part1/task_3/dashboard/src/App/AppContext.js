import {createContext} from 'react'

const user = {
    user: "",
    password: "",
    isLoggedIn: false,
}

const logOut = () => {
    console.log("Logging out")
}

const AppContext = createContext({user, logOut})

export {AppContext, user}
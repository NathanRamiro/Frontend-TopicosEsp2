import React, {useState, createContext} from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import {Light} from './Themes'

export const AppContext = createContext(null)

export default ({children})=>{
    const [tema,setTema] = useState(Light)

    return(
        <AppContext.Provider value={{tema:tema,setTema}}>
            <PaperProvider theme={tema}>
                {children}
            </PaperProvider>
        </AppContext.Provider>
    )
}
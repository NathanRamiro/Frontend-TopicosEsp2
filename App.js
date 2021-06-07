import React from 'react'
import Navigation from './src/routes/Navigation'
import ThemeProvider from './src/themes/TProvider'

export default function App(){
  return(
    <ThemeProvider>
      <Navigation/>
    </ThemeProvider>
  )
}
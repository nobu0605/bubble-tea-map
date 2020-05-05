import React from 'react'
import { MyMapComponent } from './components/map'
import PersistentDrawerLeft from './components/drawer'

function App() {
  return (
    <div className="App">
      <MyMapComponent isMarkerShown />
      <PersistentDrawerLeft />
    </div>
  )
}

export default App

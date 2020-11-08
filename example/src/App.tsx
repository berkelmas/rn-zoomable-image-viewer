import React, { useEffect } from 'react'
import RNZoomableImageViewer, { Counter } from 'rn-zoomable-image-viewer'

const App = () => {
  useEffect(() => {
    console.log(RNZoomableImageViewer)
  })

  return <Counter />
}

export default App

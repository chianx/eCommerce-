import React from 'react'
import "./loader.css"
function Loader () {
  return (
    <div className='loading'>
    <div className="spinner"><div className="inside">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div></div>
    </div>
  )
}

export default Loader;

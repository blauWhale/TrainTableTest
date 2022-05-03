import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
            <div className="navbar-start">
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl">UltraTrain</a>
            </div>
            <div className="navbar-end">
                <div style={{marginRight:"15px", fontWeight:"bold"}}>Theme: </div>
            <select data-choose-theme className="select select-bordered">
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="cupcake">Cupcake</option>
                                <option value="bumblebee">Bumblebee</option>
                                <option value="winter">Winter</option>
                                <option value="cyberpunk">Cyberpunk</option>
                                <option value="wireframe">Wireframe</option>
                                <option value="aqua">Aqua</option>
                            </select>
            </div>
        </div>
  )
}
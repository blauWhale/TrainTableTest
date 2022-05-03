import React from 'react'

export default function Navbar() {
  return (
    <div class="navbar bg-base-100">
            <div class="navbar-start">
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost normal-case text-xl">UltraTrain</a>
            </div>
            <div class="navbar-end">
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
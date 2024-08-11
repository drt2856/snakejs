import React, { useState } from 'react';

export function Welcome({setStart}) {


  return (
    <div >
      <h1>Bienvenido a Snake.js</h1>
      <div className="center-in-x">
        <button 
        className="btn btn-init"
        onClick={setStart}
        >
          Single player
        </button>
        <button className="btn btn-init">
          Multi player
        </button>

        <button className="btn btn-init">
          Settings
        </button>
        <button className="btn btn-init">
          Help
        </button>
      </div>

    </div>
  );
}
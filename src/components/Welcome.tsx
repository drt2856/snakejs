import React, { useState } from 'react';

export function Welcome({ setStart }) {


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
        <button className="btn btn-init" onClick={() => { alert("proximamente") }}>
          Multi player
        </button>

        <button className="btn btn-init" onClick={() => { alert("proximamente") }}>
          Settings
        </button>
        <button className="btn btn-init" onClick={() => { alert("proximamente") }}>
          Help
        </button>
      </div>

    </div>
  );
}
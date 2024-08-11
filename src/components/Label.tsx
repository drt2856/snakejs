import React, { useState } from 'react';
import { OBJECTS } from '../App.tsx';

export function Label({ value }) {
    let styles = whatIs()


    function whatIs() {
        if (value === OBJECTS.WALL) {
            return "red" 
        }
        if (value === OBJECTS.SNAKEB_SECTION) {
            return "blue" 
        }
        if (value === OBJECTS.HEAD_SNAKEB) {
            return "rgba(0, 0, 255, 0.068)" 
        }
        if (value === OBJECTS.APPLE) {
            return "orange" 
        }
        if (value === OBJECTS.FAST_POWER) {
            return "rgba(236, 233, 8, 0.712)"
        }
        if (value === OBJECTS.SLOW_POWER) {
            return "rgba(236, 8, 160, 0.712)"
        }
        if (value === OBJECTS.FIVE_MORE_POWER) {
            return "rgba(236, 8, 8, 0.712)"
        }
        if (value === OBJECTS.FIVE_MINUS_POWER) {
            return "rgb(0, 0, 0)"
        }
        if (value === OBJECTS.DISFRAGMENT_POWER) {
            return "rgb(50, 100, 0)"
        }
        if (value === OBJECTS.ONE_MINUS_POWER) {
            return "rgb(250, 100, 200)"
        }
        else {
            return "green" 
        }
    }

    return (
        <div className="label" style={{backgroundColor: styles}}>
            {value}
        </div>
    );
}
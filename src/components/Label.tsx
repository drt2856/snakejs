import React, { useState } from 'react';
import { OBJECTS } from '../App.tsx';

export function Label({ value }) {
    let className = whatIs()

    function whatIs() {
        if (value === OBJECTS.WALL) {
            return "wall"
        }
        if (value === OBJECTS.SNAKE_SECTION) {
            return "snake"
        }
        if (value === OBJECTS.HEAD_SNAKE) {
            return "head_snake"
        }
        if (value === OBJECTS.APPLE) {
            return "apple"
        }
        else {
            return "grass"
        }
    }

    return (
        <div className={"label " + className}>
            {value}
        </div>
    );
}
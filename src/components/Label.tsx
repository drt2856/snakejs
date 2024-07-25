import React, { useState } from 'react';

export function Label({value}) {
    let className=whatIs()

    function whatIs() {
        if(value===0){
            return"wall"
        }
        if(value===1){
           return "snake"
        }
        if(value===2){
            return "apple"
         }
        else {
           return "grass"
        }
    }
    
    return (
        <div className={"label "+className }>
            {value} 
        </div>
    );
}
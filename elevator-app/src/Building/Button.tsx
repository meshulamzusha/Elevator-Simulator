import React from 'react';
import './Floor.css'

export default class Button {
    private floorNum: string

    constructor(num: string) {
        this.floorNum = num
        
    }    

    public render() {
        return <button className="metal linear">{this.floorNum}</button>
    }
}

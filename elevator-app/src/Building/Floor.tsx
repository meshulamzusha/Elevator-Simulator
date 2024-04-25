import React from 'react'
import Button from './Button.tsx'

export default class Floor {
    private button: Button

    constructor(floorNum: string) {
        this.button = new Button(floorNum)
    }

    public render() {
        return(
            <div className='floor'>{this.button.render()}
                <div className='blackline'></div>
            </div>
        )
    }

}
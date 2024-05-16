import React, { Component, ReactNode } from 'react';
import './styles.css';
import config from './projectConfig.ts'

type FloorProps = {
    floorNumber: number;
    onClick: (floorNumber: number) => void;
};

type FloorState = {
};

export default class Floor extends Component<FloorProps, FloorState> {
    private floorHeight: number
    constructor(props: FloorProps) {
        super(props);
        this.state = {
        };
        this.floorHeight = config.floorHeight
    }

    private handleClick = (): void => {
        this.props.onClick(this.props.floorNumber);
    };

    public render(): ReactNode {
        return (
            <div className='floor' style={{height: `${this.floorHeight}px`}}>
                <button className="metal linear" onClick={this.handleClick}>{`${this.props.floorNumber}`}</button>
                <div className='blackline'></div>
            </div>
        );
    }
}

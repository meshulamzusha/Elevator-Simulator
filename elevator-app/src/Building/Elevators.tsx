import React, { Component } from "react";
import config from './projectConfig.ts'
import './elevator.css';

type ElevatorState = {
    positions: number[];
};

export default class Elevators extends Component<{}, ElevatorState> {
    private floorHeight: number;
    private numberOfElevators: number

    constructor(props: {}) {
        super(props);
        this.floorHeight = config.floorHeight;
        this.numberOfElevators = config.numberOfElevators;
        this.state = {
            positions: Array(this.numberOfElevators).fill(0),
        }
    }

    public moveUp(elevatorId: number, targetFloor: number): void{
        const newPosition = this.state.positions[elevatorId] - targetFloor * this.floorHeight
        this.state.positions[elevatorId] = newPosition
    };

    public moveDown(elevatorId: number, targetFloor: number): void {
        const newPosition = this.state.positions[elevatorId] + targetFloor * this.floorHeight
        this.state.positions[elevatorId] = newPosition
    }; 

    public render() {
        return (
            <div className="elevators-container">
        {[...Array(this.numberOfElevators)].map((_, index) => (
          <div key={index} style={{ marginLeft: '10px' }}>
            <img
              src={require('./elv.jpg')}
              style={{
                width: '60px',
                height: `${this.floorHeight}px`, 
                transform: `translateY(${this.state.positions[index]}px)`, 
                transition: 'transform 2s ease-in-out', 
                }}
            />
          </div>
        ))}
      </div>
        )
    }
}

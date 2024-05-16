import React, { Component } from "react";
import config from './projectConfig.ts'
import './styles.css';

type ElevatorState = {
    positions: number[];
    floorsToMove: number[];
};

export default class Elevators extends Component<{}, ElevatorState> {
    private floorHeight: number;
    private numberOfElevators: number;
    private secondsPerFloor: number;

    constructor(props: {}) {
        super(props);
        this.floorHeight = config.floorHeight;
        this.numberOfElevators = config.numberOfElevators;
        this.secondsPerFloor = config.secondsPerFloor;
        this.state = {
            positions: Array(this.numberOfElevators).fill(0),
            floorsToMove: Array(this.numberOfElevators).fill(0)
        }
    }

    public moveUp(elevatorId: number, targetFloor: number): void{
        const newPosition = this.state.positions[elevatorId] - targetFloor * this.floorHeight;
        const floorsToMove = Math.abs((this.state.positions[elevatorId] / this.floorHeight) - (newPosition / this.floorHeight));

        this.state.floorsToMove[elevatorId] = floorsToMove
        this.state.positions[elevatorId] = newPosition
    };

    public moveDown(elevatorId: number, targetFloor: number): void {
        const newPosition = this.state.positions[elevatorId] + targetFloor * this.floorHeight;
        const floorsToMove = Math.abs((this.state.positions[elevatorId] / this.floorHeight) - (newPosition / this.floorHeight));

        this.state.floorsToMove[elevatorId] = floorsToMove
        this.state.positions[elevatorId] = newPosition
    }; 

    public isElevatorAvailable(elevatorId: number): boolean {
        return this.state.floorsToMove[elevatorId] === 0;
    };

    public render() {
        return (
            <div className="elevators-container">
        {[...Array(this.numberOfElevators)].map((_, index) => (
          <div key={index}>
            <img
              src={require('./elv.jpg')}
              style={{
                width: '60px',
                height: `${this.floorHeight}px`, 
                transform: `translateY(${this.state.positions[index]}px)`, 
                transition: `transform calc(${this.secondsPerFloor}s * ${this.state.floorsToMove[index]}) linear`, 
                }}
            />
          </div>
        ))}
      </div>
        )
    }
}


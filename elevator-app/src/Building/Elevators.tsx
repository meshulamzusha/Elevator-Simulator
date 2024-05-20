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

    public move(elevatorId: number, targetFloor: number): void {
      const newPosition = targetFloor * this.floorHeight;
      const floorsToMove = Math.abs((this.state.positions[elevatorId] / this.floorHeight) - (newPosition / this.floorHeight));
    
      this.state.positions[elevatorId] = newPosition;
      this.state.floorsToMove[elevatorId] = floorsToMove;
    };

    public render() {
        return (
            <div className="elevators-container">
        {[...Array(this.numberOfElevators)].map((_, index) => (
          <div key={index}>
            <img
              src={'/elv.jpg'}
              alt="elevator"
              style={{
                width: `calc(${this.floorHeight * 0.66}px)`,
                height: `${this.floorHeight}px`, 
                transform: `translateY(${-this.state.positions[index]}px)`, 
                transition: `transform calc(${this.secondsPerFloor}s * ${this.state.floorsToMove[index]}) linear`, 
                }}
            />
          </div>
        ))}
      </div>
        )
    }
}


import React, { Component } from "react";
import Elevators from "./Elevators.tsx";
import RenderFloors from "./RenderFloors.tsx";
import config from './projectConfig.ts';
import './elevator.css';

type BuildingSystemProps = {};
type BuildingSystemState = {
    elevatorsPositions: number[];
};

export default class ElevatorSystemControler extends Component<BuildingSystemProps, BuildingSystemState> {
    private elevators: Elevators;

    constructor(props: BuildingSystemProps) {
        super(props);
        this.state = {
            elevatorsPositions: Array(config.numberOfElevators).fill(0),
        };
        this.elevators = new Elevators({});
    }

    private computeTheClosestElevator(floor: number): number {
        const distancesList = Array(config.numberOfElevators)
        for (let i = 0; i < config.numberOfElevators; i++) {
            const distance = Math.abs(floor - this.getCurrentFloor(i));
            distancesList[i] = distance;
        }
        const nearestElevator = distancesList.indexOf(Math.min(...distancesList))
        return nearestElevator
    }

    private getCurrentFloor(elevatorId: number): number {
        return this.state.elevatorsPositions[elevatorId];
    }

    private handleFloorButtonClick = (floorNumber: number): void => {
        const nearestElevator = this.computeTheClosestElevator(floorNumber)
        const currentFloor = this.getCurrentFloor(nearestElevator);
        const floorsToMove = Math.abs(floorNumber - currentFloor);

        if (floorNumber > currentFloor) {
            this.elevators.moveUp(nearestElevator,floorsToMove);
        } else if (floorNumber < currentFloor) {
            this.elevators.moveDown(nearestElevator,floorsToMove);
        }

        const updatedElevatorsPositions = [...this.state.elevatorsPositions];
        updatedElevatorsPositions[nearestElevator] = floorNumber;
        this.setState({ elevatorsPositions: updatedElevatorsPositions });
    };

    render() {
        return (
            <div>
                {this.elevators.render()}
                <RenderFloors onFloorButtonClick={this.handleFloorButtonClick} />
            </div>
        );
    }
}


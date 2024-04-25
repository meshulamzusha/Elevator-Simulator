import React from "react";
import Floor from "./Floor.tsx";
import './building.css'

export default class Building {
    private numberOfFloors: number;
    private numElevators: number;
    private floors: Floor[];

    constructor(numFloors: number, numElevators: number) {
        this.numberOfFloors = numFloors;
        this.numElevators = numElevators;
        this.floors = [];
        this.buildABuilding();
    }

    private buildABuilding() {
        for (let i = 0; i < this.numberOfFloors; i++) {
            const floorNumber = this.numberOfFloors - i - 1;
            const newFloor = new Floor(`${floorNumber}`)
            this.floors.push(newFloor);
        }
    }

    public render() {
        return (
            <div className="building-container">
                {this.floors.map((floor, index) => (
                    <div key={index}>
                        {floor.render()}
                    </div>
                    ))
                }
            </div>
        )
    }
}
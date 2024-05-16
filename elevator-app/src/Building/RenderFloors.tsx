import './styles.css'
import config from './projectConfig.ts'
import React, { Component } from "react";
import Floor from "./Floor.tsx";

type RenderFloorsProps = {
    onFloorButtonClick: (floorNumber: number) => void;
};

type RenderFloorsState = {
    floors: Floor[];
};

export default class RenderFloors extends Component<RenderFloorsProps, RenderFloorsState> {
    constructor(props: RenderFloorsProps) {
        super(props);
        this.state = {
            floors: [],
        };
        this.createFloors();
    }

    private createFloors(): void {
        for (let i = 0; i < config.numberOfFloors; i++) {
            const floorNumber = config.numberOfFloors - i - 1;
            const newFloor = new Floor({ floorNumber: floorNumber, onClick: this.props.onFloorButtonClick });
            this.state.floors.push(newFloor);
        }
    }

    render() {
        return (
            <div className="building-container">
                {this.state.floors.map((floor, index) => (
                    <div key={index}>
                        {floor.render()}
                    </div>
                ))}
            </div>
        );
    }
}

import './styles.css'
import config from './projectConfig.ts'
import React, { Component } from "react";
import Floor from "./Floor.tsx";

// The Renderfloors class displays an amount of a floors
// the class receives from the Building class a list of waiting times 
// and gives each floor it renders its waiting time
type RenderFloorsProps = {
    onFloorButtonClick: (floorNumber: number) => void;
    arrivalTimes: number[];
};

type RenderFloorsState = {
    floors: JSX.Element[];
};

export default class RenderFloors extends Component<RenderFloorsProps, RenderFloorsState> {
    constructor(props: RenderFloorsProps) {
        super(props);
        this.state = {
            floors: Array.from({ length: config.numberOfFloors }, (_, index) => (
                <Floor key={index} floorNumber={config.numberOfFloors - index - 1} 
                    onClick={this.props.onFloorButtonClick}
                    arrivalTimes={this.props.arrivalTimes[config.numberOfFloors - index - 1]}
                />
            )),
        };
    }
    // every time there is a change in the list of waiting times 
    // Renderfloors re-renders the floors with the new waiting times
    componentDidUpdate(prevProps: RenderFloorsProps) {
        if (prevProps.arrivalTimes !== this.props.arrivalTimes) {
            this.setState({
                floors: Array.from({ length: config.numberOfFloors }, (_, index) => (
                    <Floor key={index} floorNumber={config.numberOfFloors - index - 1} 
                        onClick={this.props.onFloorButtonClick}
                        arrivalTimes={this.props.arrivalTimes[config.numberOfFloors - index - 1]}
                    />
                )),
            });
        }
    }

    render() {
        return (
            <div className="building-container">
                {this.state.floors}
            </div>
        );
    }
}

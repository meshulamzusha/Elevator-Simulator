import React, { Component } from "react";
import Elevators from "./Elevators.tsx";
import RenderFloors from "./RenderFloors.tsx";
import config from './projectConfig.ts';
import './styles.css';

type BuildingSystemProps = {};
type BuildingSystemState = {
    elevatorsDetails: {
        finalDestination: number, 
        availabilityTime: number
    }[];
};

export default class ElevatorSystemControlleraaa extends Component<BuildingSystemProps, BuildingSystemState> {
    private elevators: Elevators;
    private interval: NodeJS.Timeout | null = null;

    constructor(props: BuildingSystemProps) {
        super(props);
        this.state = {
            elevatorsDetails: Array(config.numberOfElevators).fill({
                finalDestination: 0,
                availabilityTime: 0
            }),
        };
        this.elevators = new Elevators({});
    }

    componentDidMount() {
        this.interval = setInterval(this.updateAvailabilityTime, 500);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateAvailabilityTime = () => {
        this.setState(prevState => ({
            elevatorsDetails: prevState.elevatorsDetails.map(elevator => ({
                ...elevator,
                availabilityTime: elevator.availabilityTime > 0 ? 
                elevator.availabilityTime - 0.5 : 
                elevator.availabilityTime
            }))
        }));
    }

    private elevatorChoice(floor: number): number {
        
        let closestElevator = -1;
        let minTime = Infinity;
    
        for (let i = 0; i < config.numberOfElevators; i++) {
            const time = this.state.elevatorsDetails[i].availabilityTime;
            const completeTime = time + Math.abs((floor - this.state.elevatorsDetails[i].finalDestination) * config.secondsPerFloor);
            if (completeTime < minTime) {
                minTime = completeTime;
                closestElevator = i;
            }
        }
        return closestElevator;
    }

    private handleFloorButtonClick = (floorNumber: number): void => {

        const existingElevator = this.state.elevatorsDetails.find(elevator => 
            elevator.finalDestination === floorNumber);
        if (existingElevator) {
            return;
        }
    
        const elevator = this.elevatorChoice(floorNumber);
    
        const floorsToMove = Math.abs(floorNumber - this.state.elevatorsDetails[elevator].finalDestination);  
        const currentAvailabilityTime = this.state.elevatorsDetails[elevator].availabilityTime;   
        const updateAvailabilityTime = currentAvailabilityTime + ((floorsToMove * config.secondsPerFloor) + 2);
    
        this.setState(prevState => {
            const newElevatorsDetails = [...prevState.elevatorsDetails];
            newElevatorsDetails[elevator] = {
                ...newElevatorsDetails[elevator],
                finalDestination: floorNumber,
                availabilityTime: updateAvailabilityTime
            };
            return { elevatorsDetails: newElevatorsDetails };
        });
        
        setTimeout(() => {
            this.elevators.move(elevator, floorNumber) ;
            
        }, currentAvailabilityTime  * 1000)
    };
        

    render() {
        return (
            <div className="complet-building-container">
                <RenderFloors onFloorButtonClick={this.handleFloorButtonClick} />
                {this.elevators.render()}
            </div>
        );
    }
}


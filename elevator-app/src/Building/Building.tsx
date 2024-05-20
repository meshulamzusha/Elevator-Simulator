import React, { Component } from "react";
import Elevators from "./Elevators.tsx";
import RenderFloors from "./RenderFloors.tsx";
import config from './projectConfig.ts';
import './styles.css';

// The main class renders the other classes or uses with the other classes,
// In Class Building is the logic for managing the dispatch of the elevators,
// Building passes the function handleFloorButtonClick() as a prop to the RenderFloors class 
// and RenderFloors passes the function as a prop to each Floor element it produces 
// and thus the Floor class activates the function when the elevator call button is clicked

type BuildingSystemProps = {};
type BuildingSystemState = {
    elevatorsDetails: {
        finalDestination: number, 
        availabilityTime: number
    }[];
    arrivalTimes: number[];
};

export default class Building extends Component<BuildingSystemProps, BuildingSystemState> {
    private elevators: Elevators;
    private interval: NodeJS.Timeout | null = null;

    constructor(props: BuildingSystemProps) {
        super(props);
        this.state = {
            elevatorsDetails: Array(config.numberOfElevators).fill({
                finalDestination: 0,
                availabilityTime: 0
            }),
            arrivalTimes: Array(config.numberOfFloors).fill(0),
        };
        this.elevators = new Elevators({});
    }
    // activates a timer that goes down for every 'availabilityTime' of the elevators
    // the timer runs in the background from the start of the component's life cycle
    componentDidMount() {
        this.interval = setInterval(this.updateAvailabilityTime, 500);
    }
    // deletes the timer at the end of the component's life cycle
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    // the function subtracts half a second from availabilityTime 
    // this function is activated every half a second
    private updateAvailabilityTime = (): void => {
        this.setState(prevState => ({
            elevatorsDetails: prevState.elevatorsDetails.map(elevator => ({
                ...elevator,
                availabilityTime: elevator.availabilityTime > 0 ? 
                elevator.availabilityTime - 0.5 : 
                elevator.availabilityTime
            }))
        }));
    }

    // the function selects the elevator that will reach the requested floor the fastest
    private elevatorChoice = (floor: number): number => {
        
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
        // making sure there is no elevator on the way to the floor
        const existingElevator = this.state.elevatorsDetails.find(elevator => 
            elevator.finalDestination === floorNumber);
        if (existingElevator) {
            return;
        }
    
        const elevator = this.elevatorChoice(floorNumber);
    
        // In this section, we update the state of the elevators and the arrivalTimes 
        //that will be passed to the renderFloors class
        const floorsToMove = Math.abs(floorNumber - this.state.elevatorsDetails[elevator].finalDestination);  
        const currentAvailabilityTime = this.state.elevatorsDetails[elevator].availabilityTime;   
        const updateAvailabilityTime = currentAvailabilityTime + ((floorsToMove * config.secondsPerFloor) + 2);
        
        this.setState(prevState => {
            const updateElevatorsDetails = [...prevState.elevatorsDetails];
            updateElevatorsDetails[elevator] = {
                ...updateElevatorsDetails[elevator],
                finalDestination: floorNumber,
                availabilityTime: updateAvailabilityTime
            };
            const updateArrivalTimes = [...prevState.arrivalTimes];
            updateArrivalTimes[floorNumber] = updateAvailabilityTime - 1.5;
            return { 
                elevatorsDetails: updateElevatorsDetails,
                arrivalTimes: updateArrivalTimes 
            };
        });
        // the selected elevator is sent when the elevator becomes available
        setTimeout(() => {
            this.elevators.move(elevator, floorNumber) ;
        }, currentAvailabilityTime  * 1000)
    };

    render() {
        return (
            <div className="complet-building-container">
                <RenderFloors 
                    onFloorButtonClick={this.handleFloorButtonClick} 
                    arrivalTimes={this.state.arrivalTimes}
                />
                {this.elevators.render()}
            </div>
        );
    }
}


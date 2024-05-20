import React, { Component } from 'react';
import './styles.css';
import config from './projectConfig.ts';
//The floor class shows a floor with a button to order an elevator 
//and a screen to display the arrival time of an elevator to the floor
//and receives as a props from the class Renderfloors the arrival time of the elevator to the floor
type FloorProps = {
    floorNumber: number;
    onClick: (floorNumber: number) => void;
    arrivalTimes: number;
};

type FloorState = {
    arrivalTimes: number;
};

export default class Floor extends Component<FloorProps, FloorState> {
    private floorHeight: number;
    private interval: NodeJS.Timeout | null = null;

    constructor(props: FloorProps) {
        super(props);
        this.state = {
            arrivalTimes: this.props.arrivalTimes
        };
        this.floorHeight = config.floorHeight;
    }
    //as in Class Building, a countdown timer is activated in the background for the arrival time
    //to show the timer on the screen
    componentDidMount() {
        this.interval = setInterval(this.reduceAvailabilityTime, 500);
    }
    // deletes the timer at the end of the component's life cycle
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    //Updating the state when Renderfloors updates the arrival time in the props of Floor
    componentDidUpdate(prevProps: FloorProps) {
        if (prevProps.arrivalTimes !== this.props.arrivalTimes) {
            this.setState({ arrivalTimes: this.props.arrivalTimes });
        }
    }
    //The function subtracts half a second from arrivalTimes in the state
    //as long as it is > 0
    private reduceAvailabilityTime = (): void => {
        this.setState(prevState => ({
            arrivalTimes: Math.max(0, prevState.arrivalTimes - 0.5)
        }));
    };
    //Floor activates the function he received as a props from the Building class 
    //when the button is clicked
    private handleClick = (): void => {
        this.props.onClick(this.props.floorNumber);
    };

    render() {
        return (
            <div className='floor' style={{ height: `${this.floorHeight}px` }}>
                <div className='floor-panel'>
                    <button 
                        className="metal linear"    
                        onClick={this.handleClick}
                        style={this.state.arrivalTimes === 0 ? 
                            {color: ''} : 
                            {color: 'rgb(23, 212, 33)'}
                        }
                    >
                        {`${this.props.floorNumber}`} 
                    </button>
                    <div className='timer'>
                        <div className='timer-text'>
                        {this.state.arrivalTimes !== 0 ?
                        `${this.state.arrivalTimes.toFixed(0)}` : ''
                        }
                        </div>
                    </div>
                </div>
                <div className='blackline'></div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import './styles.css';
import config from './projectConfig.ts';

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

    componentDidMount() {
        this.interval = setInterval(this.reduceAvailabilityTime, 500);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    componentDidUpdate(prevProps: FloorProps) {
        if (prevProps.arrivalTimes !== this.props.arrivalTimes) {
            this.setState({ arrivalTimes: this.props.arrivalTimes });
        }
    }

    private reduceAvailabilityTime = (): void => {
        this.setState(prevState => ({
            arrivalTimes: Math.max(0, prevState.arrivalTimes - 0.5)
        }));
    };

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

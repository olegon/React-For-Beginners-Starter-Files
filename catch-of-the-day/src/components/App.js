import React, { Component } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

import sampleFishes from '../sample-fishes';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        const fishes = {...this.state.fishes};

        fishes[`fish-${Date.now()}`] = fish;

        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header>
                </div>
                <Order></Order>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}></Inventory>
            </div>
        );
    }
}

export default App;

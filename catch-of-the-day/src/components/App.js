import React, { Component } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

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

    addToOrder = (key) => {
        const order = {...this.state.order};

        if (key in order) {
            order[key] += 1;
        }
        else {
            order[key] = 1;
        }

        this.setState({ order });
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
                    <ul>
                        {
                            Object
                            .entries(this.state.fishes)
                            .map(([id, fish]) => 
                            <Fish
                                key={id}
                                fishId={id}
                                details={fish}
                                addToOrder={this.addToOrder}
                            />)
                        }
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes}></Order>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}></Inventory>
            </div>
        );
    }
}

export default App;

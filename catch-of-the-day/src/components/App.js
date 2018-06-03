import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import base from '../base';

import sampleFishes from '../sample-fishes';

class App extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired
    }

    state = {
        fishes: {},
        order: {}
    }

    addFish = (fish) => {
        const fishes = {...this.state.fishes};

        fishes[`fish-${Date.now()}`] = fish;

        this.setState({ fishes });
    }

    updateFish = (fishId, fish) => {
        const fishes = {...this.state.fishes};

        fishes[fishId] = fish;

        this.setState({ fishes });
    }

    deleteFish = (fishId) => {
        const fishes = {...this.state.fishes};

        fishes[fishId] = null;

        this.setState({ fishes }); 
    }

    addToOrder = (fishId) => {
        const order = {...this.state.order};

        if (fishId in order) {
            order[fishId] += 1;
        }
        else {
            order[fishId] = 1;
        }

        this.setState({ order });
    }

    removeFromOrder = (fishId) => {
        const order = {...this.state.order};

        delete order[fishId];

        this.setState({ order });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    componentDidMount() {
        const { storeId } = this.props.match.params;

        const localStoregeOrderRef = localStorage.getItem(`${storeId}-order`);

        if (localStoregeOrderRef) {
            try {
                const order = JSON.parse(localStoregeOrderRef);
                this.setState({
                    order
                });
            }
            catch (err) {
                console.error('Invalid localStorege order: ', err);
            }

        }

        this.ref = base.syncState(`${storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }


    componentDidUpdate() {
        const { storeId } = this.props.match.params;
        const { order } = this.state;

        localStorage.setItem(`${storeId}-order`, JSON.stringify(order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
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
                <Order
                    order={this.state.order}
                    fishes={this.state.fishes}
                    removeFromOrder={this.removeFromOrder} />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId} />
            </div>
        );
    }
}

export default App;

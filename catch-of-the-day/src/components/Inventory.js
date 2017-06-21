import React from 'react';

import AddFishForm from './AddFishForm';
import fishes from '../sample-fishes';

export default class Inventory extends React.Component {
    loadSamples (e) {
        this.props.loadFishes(fishes);
    }

    render () {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm addFish={ this.props.addFish } />
                <button onClick={ e => this.loadSamples(e) }>Load samples!</button>
            </div>   
        );
    }
}
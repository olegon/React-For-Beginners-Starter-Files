import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
    static propTypes = {
        addFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        fishes: PropTypes.object.isRequired,
    }

    render() {
        const { addFish, loadSampleFishes, fishes } = this.props;

        return (
            <div className="inventory">
                <h2>Inventory</h2>

                { 
                    Object.entries(fishes).map(([fishId, fish]) =>
                        <EditFishForm
                            key={fishId}
                            fishId={fishId}
                            fish={fish}
                            updateFish={this.props.updateFish}
                            deleteFish={this.props.deleteFish} />
                    )
                }

                <AddFishForm addFish={addFish} />

                <button onClick={loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;

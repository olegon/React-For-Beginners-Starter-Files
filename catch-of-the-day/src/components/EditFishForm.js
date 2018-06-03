import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
    static propTypes = {
        fishId: PropTypes.string.isRequired,
        fish: PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }),
        deleteFish: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired,
    }

    handleChange = (event) => {
        const { name, value } = event.currentTarget;
        const { fishId } = this.props;

        const fish = {
            ...this.props.fish,
            [name]: value
        };

        this.props.updateFish(fishId, fish);
    }

    render() {
        const { fishId, fish, deleteFish } = this.props;

        return (
            <div className="fish-edit">
                <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={fish.name} />
                <input type="number" name="price" placeholder="Price" onChange={this.handleChange} value={fish.price} />
                <select type="text" name="status" placeholder="Status" onChange={this.handleChange} value={fish.status}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" placeholder="Description" onChange={this.handleChange} value={fish.desc}></textarea>
                <input type="text" name="image" placeholder="Image" onChange={this.handleChange} value={fish.image} />
                <button onClick={() => deleteFish(fishId)}>Delete</button>
            </div>
        );
    }
}

export default EditFishForm;

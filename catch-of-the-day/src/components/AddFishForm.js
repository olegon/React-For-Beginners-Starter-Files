import React, { Component } from 'react';

class AddFishForm extends Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descriptionRef = React.createRef();
    imageRef = React.createRef();
    
    handleSubmit = (event) => {
        event.preventDefault();

        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            description: this.descriptionRef.current.value,
            image: this.imageRef.current.value
        };

        this.props.addFish(fish);

        event.currentTarget.reset();
    }

    render() {
        return (
            <form className="fish-edit" onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name" ref={this.nameRef} />
                <input type="number" name="price" placeholder="Price" ref={this.priceRef} />
                <select type="text" name="status" placeholder="Status" ref={this.statusRef} >
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="description" placeholder="Description" ref={this.descriptionRef}></textarea>
                <input type="text" name="image" placeholder="Image" ref={this.imageRef} />
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;

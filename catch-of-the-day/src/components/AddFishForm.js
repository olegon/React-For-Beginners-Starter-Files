import React from 'react';

class AddFishForm extends React.Component {
    addFish (e) {
        e.preventDefault();

        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        };

        this.props.addFish(fish);

        this.fishForm.reset();
    }

    render () {
        return (
            <form className="fish-edit" ref={ (el) => this.fishForm = el } onSubmit={ (e) => this.addFish(e) }>
                <input type="text" placeholder="Fish Name" ref={ (el) => this.name = el }/>
                <input type="text" placeholder="Fish Price" ref={ (el) => this.price = el }/>
                <select ref={ (el) => this.status = el }>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea placeholder="Fish Desc" ref={ (el) => this.desc = el }></textarea>
                <input type="text" placeholder="Fish Image" ref={ (el) => this.image = el }/>
                <button type="submit">+ Add Item</button>
            </form>   
        );
    }
}


AddFishForm.propTypes = {
    addFish: React.PropTypes.func.isRequired
};

export default AddFishForm;